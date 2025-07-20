'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';

import WelcomeModal from '@/components/welcome-modal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  Loader2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the chat component
const ChatComponent = dynamic(() => import('@/components/chat/chat'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  ),
});

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Experience: 'What is your work experience? Tell me about your professional background.',
  Contact: 'How can I contact you?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Experience', color: '#B95F9D', icon: BriefcaseBusiness },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

const TITLES = [
  'GenAI Developer',
  'Data Scientist',
  'Machine Learning Engineer',
];

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentTitle, setCurrentTitle] = useState(0);
  const titleTimeout = useRef<NodeJS.Timeout | null>(null);

  const openChat = async (query: string) => {
    setInitialQuery(query);
    setIsChatOpen(true);
  };

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8, delay: 0.2 },
    },
  };

  // Page transition variants
  const pageTransitionVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  };

  useEffect(() => {
    titleTimeout.current = setTimeout(() => {
      setCurrentTitle((prev) => (prev + 1) % TITLES.length);
    }, 2000);
    return () => {
      if (titleTimeout.current) clearTimeout(titleTimeout.current);
    };
  }, [currentTitle]);

  useEffect(() => {
    // Preload chat assets in background
    const img = new window.Image();
    img.src = '/landing-memojis.png';

    // Preload new emoji GIF
    const gifImg = new window.Image();
    gifImg.src = '/EmojiMovie774657265.gif';
  }, []);

  return (
    <motion.div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >


      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-muted-foreground/10 to-muted-foreground/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Rakshith
        </div>
      </div>



      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => {
            const subject = encodeURIComponent('I wanna discuss with you for an offer');
            const body = encodeURIComponent('Hi Rakshith,\n\nI would like to discuss a potential opportunity with you.\n\nBest regards,');
            window.location.href = `mailto:dharmappa.r@northeastern.edu?subject=${subject}&body=${body}`;
          }}
                      className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-background/30 px-4 py-1.5 text-sm font-medium text-foreground shadow-md backdrop-blur-lg transition hover:bg-background/60"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          wanna hire me?
        </button>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-4 flex flex-col items-center text-center md:mt-4 md:mb-8"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Rakshith 👋
        </h2>
        <div style={{ minHeight: 60 }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={TITLES[currentTitle]}
              className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {TITLES[currentTitle]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>

              {/* centre memoji */}
        <motion.div 
          className="relative z-10 mb-8 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/landing-memojis.png"
            alt="Hero memoji"
            width={300}
            height={300}
            priority
            className="h-48 w-48 object-contain sm:h-64 sm:w-64"
          />
        </motion.div>

        {/* input + quick buttons */}
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate="visible"
          className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
        >
          {/* free-form question */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (input.trim()) {
                await openChat(input.trim());
              }
            }}
            className="relative w-full max-w-lg"
          >
            <div className="mx-auto flex items-center rounded-full border border-border bg-background/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-border/60">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="w-full border-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Submit question"
                className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* quick-question grid */}
          <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {questionConfig.map(({ key, color, icon: Icon }) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  onClick={() => openChat(questions[key])}
                  variant="outline"
                  className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-background/30 py-8 shadow-none backdrop-blur-lg md:p-10"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1 text-muted-foreground">
                    <Icon size={22} strokeWidth={2} color={color} />
                    <span className="text-xs font-medium sm:text-sm">{key}</span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Chat Overlay */}
        <AnimatePresence mode="wait">
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: '100%', scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: '100%', scale: 0.95 }}
              transition={{ 
                type: 'spring', 
                damping: 30, 
                stiffness: 300,
                duration: 0.6
              }}
              className="fixed inset-0 z-50 bg-background"
            >
              <div className="relative h-full w-full">
                {/* Chat component */}
                <ChatComponent initialQuery={initialQuery} onClose={() => setIsChatOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FluidCursor />
      </motion.div>
    );
  }
