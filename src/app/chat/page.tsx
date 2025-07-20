'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Chat from '@/components/chat/chat';

// Loading component with smooth animation
const ChatLoading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:bg-neutral-900/80"
    >
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Loading Chat Interface
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Preparing your conversation with Rakshith...
        </p>
      </div>
    </motion.div>
  </motion.div>
);

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Suspense fallback={<ChatLoading />}>
        <Chat />
      </Suspense>
    </motion.div>
  );
}