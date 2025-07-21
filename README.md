# Portfolio - Rakshith Dharmappa

A modern, interactive portfolio built with Next.js, featuring an AI-powered chat interface using Groq.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🤖 AI-powered chat interface using Groq's Llama model
- 🛠️ Full-stack development with Next.js 15
- 📱 Mobile-first responsive design
- 🌙 Dark/Light theme support
- ⚡ Fast performance with optimized builds
- 🔧 Tool-based AI responses for portfolio information

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **AI**: Groq API with Llama 3.1 70B (primary) and fallback models
- **UI Components**: Radix UI, Lucide React
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Groq API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=your_github_token_here
BRAVE_API_KEY=your_brave_api_key_here
```

### Getting API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

#### Brave API Key (for Web Search)
1. Visit [Brave Search API](https://api.search.brave.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Building for Production

```bash
pnpm build
pnpm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for AI chat functionality | Yes |
| `GITHUB_TOKEN` | GitHub token for fetching repository stars | No |
| `BRAVE_API_KEY` | Brave Search API key for web search functionality | No |

## AI Chat Features

The portfolio includes an AI-powered chat interface that can:

- Provide information about projects and skills
- Share contact details and resume
- Answer questions about background and experience
- Show sports photos and achievements
- Handle internship inquiries
- Share personal anecdotes and experiences
- **Search the web for current events and recent information**

### Rate Limiting

The chat API includes built-in rate limiting:
- 10 requests per minute per IP address
- Automatic retry logic for transient errors
- Graceful error handling for API failures

### Model Configuration

The system uses a tiered model approach for optimal performance:
- **Primary**: Llama 3.1 70B (8192 context) - Best tool calling capabilities
- **Fallback 1**: Llama 3.1 8B (8192 context) - Fast response times
- **Fallback 2**: Mixtral 8x7B (32768 context) - Large context window

The system automatically falls back to the next model if the primary model fails.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/          # AI chat endpoint
│   │   └── github-stars/  # GitHub stars endpoint
│   ├── chat/              # Chat page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── chat/             # Chat-related components
│   ├── projects/         # Project display components
│   └── ui/               # Reusable UI components
└── lib/                  # Utility functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check the console for error messages
2. Verify your environment variables are set correctly
3. Ensure your Groq API key is valid and has sufficient credits
4. Check the network tab for API request failures

## Performance Optimizations

- Lazy loading of components
- Optimized images with Next.js Image component
- Efficient AI model selection (Llama 3.1 8B Instant)
- Rate limiting to prevent abuse
- Error boundaries for graceful failure handling
