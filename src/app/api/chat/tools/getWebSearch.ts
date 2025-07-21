import { tool } from "ai";
import { z } from "zod";

interface BraveSearchResult {
  title: string;
  link: string;
  snippet: string;
  // Add optional fields that might be in the response
  description?: string;
  age?: string;
  published?: string;
}

interface BraveSearchResponse {
  web?: {
    results: BraveSearchResult[];
  };
  results?: BraveSearchResult[];
  // Add query info if available
  query?: {
    original: string;
    altered?: string;
  };
}

// Add rate limiting helper
class RateLimiter {
  private lastCall = 0;
  private readonly minInterval = 100; // 100ms between calls

  async throttle() {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastCall;
    if (timeSinceLastCall < this.minInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minInterval - timeSinceLastCall));
    }
    this.lastCall = Date.now();
  }
}

const rateLimiter = new RateLimiter();

export const getWebSearch = tool({
  description:
    "Search the web for current information, recent news, or up-to-date data. Use this when you need to find the latest information about current events, recent developments, or any topic that requires real-time data.",
  parameters: z.object({
    query: z.string().describe("The search query to look up on the web. Be specific and include relevant keywords for better results."),
    count: z.number().optional().default(5).describe("Number of search results to return (1-10, default 5)"),
    // Add optional parameters
    freshness: z.enum(['pd', 'pw', 'pm', 'py', 'all']).optional().describe("Filter by time period: pd=past day, pw=past week, pm=past month, py=past year, all=all time"),
    country: z.string().optional().describe("Country code for localized results (e.g., 'US', 'GB', 'FR')"),
  }),
  execute: async ({ query, count = 5, freshness, country }: { 
    query: string; 
    count?: number;
    freshness?: 'pd' | 'pw' | 'pm' | 'py' | 'all';
    country?: string;
  }) => {
    try {
      const BRAVE_API_KEY = process.env.BRAVE_API_KEY;
      
      if (!BRAVE_API_KEY) {
        return "Web search is currently unavailable due to missing API configuration. Please set the BRAVE_API_KEY environment variable.";
      }

      // Sanitize and validate query
      const sanitizedQuery = query.trim();
      if (!sanitizedQuery) {
        return "Search query cannot be empty. Please provide a valid search term.";
      }

      // Rate limiting
      await rateLimiter.throttle();

      // Validate count parameter
      const resultCount = Math.min(Math.max(count, 1), 10);

      // Build URL with query parameters
      const url = new URL('https://api.search.brave.com/res/v1/web/search');
      url.searchParams.append('q', sanitizedQuery);
      url.searchParams.append('count', resultCount.toString());
      
      // Add optional parameters if provided
      if (freshness && freshness !== 'all') {
        url.searchParams.append('freshness', freshness);
      }
      if (country) {
        url.searchParams.append('country', country.toUpperCase());
      }

      console.log('Brave API request:', {
        url: url.toString(),
        query: sanitizedQuery,
        count: resultCount,
        freshness,
        country
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'X-Subscription-Token': BRAVE_API_KEY,
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (!response.ok) {
        let errorMessage = `${response.status} ${response.statusText}`;
        
        // Try to get more detailed error info
        try {
          const errorText = await response.text();
          errorMessage += ` - ${errorText}`;
        } catch {
          // Ignore errors reading error response
        }

        console.error('Brave API error:', errorMessage);
        
        // Provide user-friendly error messages
        if (response.status === 401) {
          return "Search authentication failed. Please check your API key configuration.";
        } else if (response.status === 429) {
          return "Search rate limit exceeded. Please try again in a few moments.";
        } else if (response.status >= 500) {
          return "Search service is temporarily unavailable. Please try again later.";
        }
        
        throw new Error(`Brave API error: ${errorMessage}`);
      }

      const data: BraveSearchResponse = await response.json();
      
      console.log('Brave API response received:', {
        hasWebResults: !!data.web?.results,
        hasDirectResults: !!data.results,
        resultCount: data.web?.results?.length || data.results?.length || 0
      });

      // Handle different possible response structures
      let results: BraveSearchResult[] = [];
      
      if (data.web && data.web.results) {
        results = data.web.results;
      } else if (data.results) {
        // Fallback for different response structure
        results = data.results;
      } else {
        console.error('Unexpected Brave API response structure:', JSON.stringify(data).slice(0, 200));
        return `No search results found for "${sanitizedQuery}". The search service returned an unexpected response format.`;
      }

      if (results.length === 0) {
        return `No search results found for "${sanitizedQuery}". Try:\n` +
               `• Using different keywords\n` +
               `• Checking your spelling\n` +
               `• Using more general terms`;
      }

      // Limit results to requested count
      const limitedResults = results.slice(0, resultCount);
      
      // Format results in a readable way with enhanced formatting
      const formattedResults = limitedResults.map((result, index) => {
        const parts = [`${index + 1}. **${result.title}**`];
        
        // Add snippet or description
        if (result.snippet) {
          parts.push(`   ${result.snippet}`);
        } else if (result.description) {
          parts.push(`   ${result.description}`);
        }
        
        // Add age if available
        if (result.age || result.published) {
          parts.push(`   Published: ${result.age || result.published}`);
        }
        
        parts.push(`   Source: ${result.link}`);
        
        return parts.join('\n');
      }).join('\n\n');

      // Build response with metadata
      const responseText = [
        `Search results for "${sanitizedQuery}":`,
        freshness ? `Time filter: ${freshness === 'pd' ? 'Past day' : freshness === 'pw' ? 'Past week' : freshness === 'pm' ? 'Past month' : 'Past year'}` : null,
        country ? `Location: ${country}` : null,
        '',
        formattedResults,
        '',
        '*Note: These results are from web search and may contain recent information. Always verify important facts from multiple sources.*'
      ].filter(Boolean).join('\n');

      return responseText;
      
    } catch (error) {
      console.error('Web search error:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return "Search request timed out. Please try again with a simpler query.";
        }
        if (error.message.includes('fetch')) {
          return "Network error occurred while searching. Please check your internet connection.";
        }
      }
      
      return `Unable to perform web search at the moment. Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  },
});