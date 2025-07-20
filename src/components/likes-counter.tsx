'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LikesCounterProps {
  className?: string;
}

export default function LikesCounter({ className }: LikesCounterProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load likes count from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('portfolio-likes');
    const userHasLiked = localStorage.getItem('portfolio-user-liked');
    
    if (savedLikes) {
      setLikes(parseInt(savedLikes, 10));
    }
    
    if (userHasLiked === 'true') {
      setHasLiked(true);
    }
  }, []);

  const handleLike = () => {
    if (hasLiked) return; // Prevent multiple likes from same user

    setIsAnimating(true);
    setHasLiked(true);
    setLikes(prev => prev + 1);
    
    // Save to localStorage
    localStorage.setItem('portfolio-likes', (likes + 1).toString());
    localStorage.setItem('portfolio-user-liked', 'true');
    
    // Reset animation after a short delay
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <TooltipProvider>
      <motion.div
        className={`fixed top-6 right-6 z-30 ${className}`}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              <Button
                onClick={handleLike}
                disabled={hasLiked}
                variant="ghost"
                size="sm"
                className={`relative group transition-all duration-300 rounded-xl border border-border/50 bg-background/30 backdrop-blur-lg hover:bg-background/50 ${
                  hasLiked 
                    ? 'text-amber-500 hover:text-amber-600 border-amber-500/30' 
                    : 'text-muted-foreground hover:text-amber-500 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center gap-1 px-2 py-1">
                  <motion.div
                    animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Heart 
                      className={`h-3.5 w-3.5 transition-all duration-300 ${
                        hasLiked ? 'fill-amber-500' : 'group-hover:fill-amber-500/20'
                      }`}
                    />
                  </motion.div>
                  
                  <motion.span
                    key={likes}
                    initial={{ scale: 1.2, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs font-medium text-center"
                    style={{ 
                      minWidth: likes >= 100 ? '1.4rem' : likes >= 10 ? '1rem' : '0.7rem'
                    }}
                  >
                    {likes}
                  </motion.span>
                </div>
                
                {/* Floating hearts animation when liked */}
                <AnimatePresence>
                  {isAnimating && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ 
                            opacity: 1, 
                            scale: 0, 
                            x: 0, 
                            y: 0 
                          }}
                          animate={{ 
                            opacity: 0, 
                            scale: 1, 
                            x: (Math.random() - 0.5) * 60, 
                            y: -60 - Math.random() * 30 
                          }}
                          transition={{ 
                            duration: 1.5, 
                            ease: "easeOut",
                            delay: i * 0.1 
                          }}
                          className="absolute pointer-events-none"
                        >
                          <Heart className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="left" 
            className="bg-background/90 backdrop-blur-lg border-border text-foreground"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                {hasLiked ? 'Thanks for the like! ❤️' : 'Like here if you liked my portfolio'}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
} 