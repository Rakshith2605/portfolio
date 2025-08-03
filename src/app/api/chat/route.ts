import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Environment variable validation
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY is not set in environment variables');
}

import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getExperience } from './tools/getExperience';
import { getInternship } from './tools/getIntership';
import { getMe } from './tools/getMe';
import { getPresentation } from './tools/getPresentation';
import { getProducts } from './tools/getProducts';
import { getProjects } from './tools/getProjects';
import { getRCB } from './tools/getRCB';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSport';
import { getWebSearch } from './tools/getWebSearch';

export const maxDuration = 30;

// Rate limiting map (in-memory for simplicity, consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Simple cache for tool results (in-memory, consider Redis for production)
const toolCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Clean up old rate limit entries and cache every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
  for (const [key, data] of toolCache.entries()) {
    if (now > data.timestamp + CACHE_TTL) {
      toolCache.delete(key);
    }
  }
}, 5 * 60 * 1000);

// Enhanced error handler with detailed error types
function errorHandler(error: unknown): string {
  if (error == null) {
    return 'An unexpected error occurred. Please try again.';
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('GROQ_API_KEY')) {
      return 'API configuration error. Please contact support.';
    }
    if (error.message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your connection and try again.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip);
  
  if (!userData || now > userData.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  userData.count++;
  return true;
}

// Get client IP address
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

export async function POST(req: Request) {
  const clientIP = getClientIP(req);
  
  try {
    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait before making another request.' }),
        { 
          status: 429,
          headers: { 
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
            'Retry-After': '60'
          }
        }
      );
    }

    // Validate API key
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages } = await req.json();
    
    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format. Messages array is required.' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate message content and length
    const maxMessageLength = 10000; // 10KB per message
    const maxMessages = 50; // Maximum number of messages in conversation
    
    if (messages.length > maxMessages) {
      return new Response(
        JSON.stringify({ error: 'Too many messages in conversation. Please start a new chat.' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate each message
    for (const message of messages) {
      if (!message || typeof message !== 'object') {
        return new Response(
          JSON.stringify({ error: 'Invalid message format.' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      if (message.content && typeof message.content === 'string' && message.content.length > maxMessageLength) {
        return new Response(
          JSON.stringify({ error: 'Message too long. Please shorten your message.' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    console.log('[CHAT-API] Incoming messages:', messages.length, 'messages from IP:', clientIP);

    // Add system prompt
    const messagesWithSystem = [SYSTEM_PROMPT, ...messages];

    // Create cached versions of tools for better performance
    const createCachedTool = (tool: any, toolName: string) => ({
      ...tool,
      execute: async (params: any) => {
        const cacheKey = `${toolName}:${JSON.stringify(params)}`;
        const cached = toolCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
          return cached.data;
        }
        
        const result = await tool.execute(params);
        toolCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }
    });

    const tools = {
      getProducts: createCachedTool(getProducts, 'getProducts'),
      getProjects: createCachedTool(getProjects, 'getProjects'),
      getPresentation: createCachedTool(getPresentation, 'getPresentation'),
      getResume: createCachedTool(getResume, 'getResume'),
      getContact: createCachedTool(getContact, 'getContact'),
      getSkills: createCachedTool(getSkills, 'getSkills'),
      getExperience: createCachedTool(getExperience, 'getExperience'),
      getSports: createCachedTool(getSports, 'getSports'),
      getCrazy: createCachedTool(getCrazy, 'getCrazy'),
      getInternship: createCachedTool(getInternship, 'getInternship'),
      getMe: createCachedTool(getMe, 'getMe'),
      getRCB: createCachedTool(getRCB, 'getRCB'),
      getWebSearch: createCachedTool(getWebSearch, 'getWebSearch'),
    };

    // Optimized model configuration
    const modelConfig = {
      name: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      maxSteps: 2, // Reduced for faster tool calls
      maxTokens: 1500, // Reduced for faster responses
      temperature: 0.5, // Lower temperature for more focused responses
    };

    

    // Optimized retry mechanism
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[CHAT-API] Attempt ${attempt} with model: ${modelConfig.name}`);
        
        const result = streamText({
          model: groq(modelConfig.name),
          messages: messagesWithSystem,
          toolCallStreaming: true,
          tools,
          maxSteps: modelConfig.maxSteps,
          temperature: modelConfig.temperature,
          maxTokens: modelConfig.maxTokens,
        });

        const response = result.toDataStreamResponse({
          getErrorMessage: errorHandler,
        });
        
        // Add security and rate limit headers
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
        response.headers.set('X-RateLimit-Remaining', (MAX_REQUESTS_PER_WINDOW - (rateLimitMap.get(clientIP)?.count || 0)).toString());
        response.headers.set('X-Model-Used', modelConfig.name);
        
        return response;
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt} failed:`, error);
        
        // Don't retry on certain error types
        if (error instanceof Error) {
          if (error.message.includes('validation') || 
              error.message.includes('GROQ_API_KEY') ||
              error.message.includes('rate limit')) {
            break;
          }
        }
        
        // Wait before retrying (except on last attempt)
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        }
      }
    }
    
    // If all retries failed, throw the last error
    throw lastError || new Error('All retry attempts failed');
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    
    // Return appropriate HTTP status based on error type
    let status = 500;
    if (err instanceof Error) {
      if (err.message.includes('rate limit')) status = 429;
      else if (err.message.includes('validation')) status = 400;
      else if (err.message.includes('GROQ_API_KEY')) status = 503;
    }
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
