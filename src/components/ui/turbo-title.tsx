import React from 'react';

interface TurboTitleProps {
  text: string;
  className?: string;
}

const TurboTitle: React.FC<TurboTitleProps> = ({ text, className = '' }) => {
  return (
    <div className="flex flex-col">
      <span
        style={{ '--text': `'${text}'` } as React.CSSProperties}
        className={`pointer-events-none relative overflow-hidden text-center font-mono text-[clamp(3rem,15vw,10rem)] font-medium tracking-tighter before:bg-gradient-to-b before:from-muted-foreground/70 before:to-muted-foreground/50 before:to-80% before:bg-clip-text before:text-transparent before:content-[var(--text)] after:absolute after:inset-0 after:bg-muted-foreground/50 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-[var(--text)] after:[text-shadow:0_1px_0_currentColor] ${className}`}
      ></span>
    </div>
  );
};

export default TurboTitle;