import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface DialoguePanelProps {
  location: string;
  speaker: string;
  text: string;
  isSceneComplete: boolean;
  onContinue: () => void;
}

export default function DialoguePanel({ location, speaker, text, isSceneComplete, onContinue }: DialoguePanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = panelRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
    );
  }, [location, speaker, text]);

  return (
    <div ref={panelRef} className="space-y-6">
      <div className="mb-4 text-sm uppercase tracking-[0.22em] text-white/60">{location}</div>
      <div className="text-white/90 text-lg leading-8 min-h-[7.5rem]">
        <span className="font-semibold text-sun">{speaker}</span>
        <p className="mt-3 text-white/85">{text}</p>
      </div>
      {!isSceneComplete && (
        <button
          type="button"
          className="mt-6 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-sun hover:text-white"
          onClick={onContinue}
        >
          continuar
        </button>
      )}
    </div>
  );
}
