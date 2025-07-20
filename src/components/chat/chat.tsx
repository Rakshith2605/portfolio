'use client';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Lazy load components
const ChatBottombar = dynamic(() => import('@/components/chat/chat-bottombar'));
const ChatLanding = dynamic(() => import('@/components/chat/chat-landing'));
const ChatMessageContent = dynamic(() => import('@/components/chat/chat-message-content'));
const SimplifiedChatView = dynamic(() => import('@/components/chat/simple-chat-view').then(mod => ({ default: mod.SimplifiedChatView })));
const WelcomeModal = dynamic(() => import('@/components/welcome-modal'));
const HelperBoost = dynamic(() => import('./HelperBoost'));

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ArrowLeft, X } from 'lucide-react';
import { GithubButton } from '../ui/github-button';

// Constants
const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
} as const;

const HEADER_HEIGHTS = {
  default: 180,
  withTool: 100,
} as const;

// Types
interface AvatarProps {
  hasActiveTool: boolean;
  isTalking: boolean;
}

interface ChatState {
  autoSubmitted: boolean;
  loadingSubmit: boolean;
  isTalking: boolean;
}

// Client-side only hook for iOS detection
const useIsIOSDevice = () => {
  const [isIOS, setIsIOS] = useState(false);
  
  useEffect(() => {
    const ua = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const maxTouchPoints = window.navigator.maxTouchPoints || 0;
    
    setIsIOS(
      /iPad|iPhone|iPod/.test(ua) ||
      /iPad|iPhone|iPod/.test(platform) ||
      (platform === 'MacIntel' && maxTouchPoints > 1) ||
      (/Safari/.test(ua) && !/Chrome/.test(ua))
    );
  }, []);
  
  return isIOS;
};

// Avatar component with optimized iOS detection
const Avatar = dynamic<AvatarProps>(
  () =>
    Promise.resolve(({ hasActiveTool, isTalking }: AvatarProps) => {
      const isIOSDevice = useIsIOSDevice();
      
      return (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'
          }`}
        >
          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            {isIOSDevice ? (
              <img
                src="/landing-memojis.png"
                alt="Avatar"
                className="h-full w-full scale-[1.8] object-contain"
                loading="eager"
              />
            ) : (
              <img
                src="/EmojiMovie774657265.gif"
                alt="Avatar"
                className="h-full w-full scale-[1.8] object-contain"
                loading="eager"
              />
            )}
          </div>
        </div>
      );
    }),
  { ssr: false }
);

interface ChatProps {
  initialQuery?: string;
  onClose?: () => void;
}

const Chat = ({ initialQuery, onClose }: ChatProps) => {
  const searchParams = useSearchParams();
  const queryFromParams = searchParams.get('query');
  const finalInitialQuery = initialQuery || queryFromParams;
  
  // Consolidated state
  const [chatState, setChatState] = useState<ChatState>({
    autoSubmitted: false,
    loadingSubmit: false,
    isTalking: false,
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setInput,
    reload,
    addToolResult,
    append,
  } = useChat({
    api: '/api/chat',
    onResponse: useCallback((response: any) => {
      if (response) {
        setChatState(prev => ({ ...prev, loadingSubmit: false, isTalking: true }));
      }
    }, []),
    onFinish: useCallback(() => {
      setChatState(prev => ({ ...prev, loadingSubmit: false, isTalking: false }));
    }, []),
    onError: useCallback((error: any) => {
      setChatState(prev => ({ ...prev, loadingSubmit: false, isTalking: false }));
      console.error('Chat error:', error);
      
      // Enhanced error handling for different error types
      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (error.message.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('GROQ_API_KEY') || error.message.includes('API configuration')) {
        errorMessage = 'Service temporarily unavailable. Please try again later.';
      } else if (error.message.includes('validation')) {
        errorMessage = 'Invalid request. Please check your input and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    }, []),
  });

  // Memoized calculations
  const { currentAIMessage, latestUserMessage, hasActiveTool, isToolInProgress } = useMemo(() => {
    const latestAIIndex = messages.findLastIndex(m => m.role === 'assistant');
    const latestUserIndex = messages.findLastIndex(m => m.role === 'user');
    
    let currentAI = latestAIIndex !== -1 ? messages[latestAIIndex] : null;
    const latestUser = latestUserIndex !== -1 ? messages[latestUserIndex] : null;
    
    // Check if AI message is outdated
    if (latestAIIndex < latestUserIndex) {
      currentAI = null;
    }
    
    const hasActiveTool = currentAI?.parts?.some(
      part => part.type === 'tool-invocation' && part.toolInvocation?.state === 'result'
    ) || false;
    
    const isToolInProgress = messages.some(
      m => m.role === 'assistant' && 
      m.parts?.some(
        part => part.type === 'tool-invocation' && 
        part.toolInvocation?.state !== 'result'
      )
    );

    return { 
      currentAIMessage: currentAI, 
      latestUserMessage: latestUser, 
      hasActiveTool,
      isToolInProgress
    };
  }, [messages]);

  const isEmptyState = !currentAIMessage && !latestUserMessage && !chatState.loadingSubmit;
  const headerHeight = hasActiveTool ? HEADER_HEIGHTS.withTool : HEADER_HEIGHTS.default;

  // Callbacks
  const submitQuery = useCallback((query: string) => {
    if (!query.trim() || isToolInProgress) return;
    setChatState(prev => ({ ...prev, loadingSubmit: true }));
    append({ role: 'user', content: query });
  }, [isToolInProgress, append]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isToolInProgress) return;
    submitQuery(input);
    setInput('');
  }, [input, isToolInProgress, submitQuery, setInput]);

  const handleStop = useCallback(() => {
    stop();
    setChatState(prev => ({ ...prev, loadingSubmit: false, isTalking: false }));
  }, [stop]);

  // Effects
  useEffect(() => {
    if (finalInitialQuery && !chatState.autoSubmitted) {
      setChatState(prev => ({ ...prev, autoSubmitted: true }));
      submitQuery(finalInitialQuery);
      // Clear the input after submitting the initial query
      setTimeout(() => setInput(''), 100);
    }
  }, [finalInitialQuery, chatState.autoSubmitted, setInput, submitQuery]);

  const isIOSDevice = useIsIOSDevice();

  return (
    <motion.div 
      className="relative h-screen overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Header Controls */}
      <motion.div 
        className="absolute top-6 left-6 z-51"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <button
          onClick={() => window.history.back()}
                      className="flex items-center gap-2 rounded-full border bg-background/30 px-4 py-2 text-sm font-medium text-foreground shadow-md backdrop-blur-lg transition hover:bg-background/60"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      {/* Close button */}
      <motion.div 
        className="absolute top-6 right-6 z-51"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 border border-border shadow-lg backdrop-blur-sm hover:bg-background/90 transition-all duration-200"
          aria-label="Close chat"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
      </motion.div>



      {/* Fixed Avatar Header */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          background:
            'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 30%, hsl(var(--background) / 0.8) 50%, hsl(var(--background) / 0) 100%)',
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      >
        <div className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}>
          <motion.div 
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
          >
            <Avatar
              hasActiveTool={hasActiveTool}
              isTalking={chatState.isTalking}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        <div
          className="flex-1 overflow-y-auto px-2"
          style={{ paddingTop: `${headerHeight}px` }}
        >
          <AnimatePresence mode="wait">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                {...MOTION_CONFIG}
              >
                <ChatLanding submitQuery={submitQuery} />
              </motion.div>
            ) : (
              <div className="pb-4 space-y-4">
                {/* Show user message */}
                {latestUserMessage && (
                  <motion.div {...MOTION_CONFIG} className="flex justify-end">
                    <div className="max-w-[80%] px-4">
                      <ChatBubble variant="sent">
                        <ChatBubbleMessage>
                          <ChatMessageContent
                            message={latestUserMessage as any}
                            isLast={true}
                            isLoading={false}
                            reload={() => Promise.resolve(null)}
                          />
                        </ChatBubbleMessage>
                      </ChatBubble>
                    </div>
                  </motion.div>
                )}
                
                {/* Show AI message */}
                {currentAIMessage && (
                  <SimplifiedChatView
                    message={currentAIMessage}
                    isLoading={isLoading}
                    reload={reload}
                    addToolResult={addToolResult}
                  />
                )}
                
                {/* Show loading state */}
                {chatState.loadingSubmit && !currentAIMessage && (
                  <motion.div {...MOTION_CONFIG} className="px-4">
                    <ChatBubble variant="received">
                      <ChatBubbleMessage isLoading />
                    </ChatBubble>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="sticky bottom-0 bg-background px-2 pt-3 md:px-0 md:pb-4">
          <div className="relative flex flex-col items-center gap-3">
            <HelperBoost submitQuery={submitQuery} setInput={setInput} />
            <ChatBottombar
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
              stop={handleStop}
              isToolInProgress={isToolInProgress}
            />
          </div>
        </div>
        

      </div>
    </motion.div>
  );
};

export default Chat;