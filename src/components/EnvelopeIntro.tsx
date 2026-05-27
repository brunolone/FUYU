import { useState, useCallback } from 'react';

// @ts-expect-error — vite-imagetools returns string URL with ?format query
import cartaTotal from '../assets/novos assets/cartatotal.png?format=webp&quality=85';
// @ts-expect-error
import cartaTop   from '../assets/novos assets/cartatop.png?format=webp&quality=85';
// @ts-expect-error
import cartaBot   from '../assets/novos assets/cartabot.png?format=webp&quality=85';
import { playBGM } from '../utils/audio';


interface Props {
  onFinish: () => void;
}

export default function EnvelopeIntro({ onFinish }: Props) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle');

  const handleClick = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('opening');

    // Inicia a música com fade-in suave junto com a animação
    playBGM(0.35, 2500);

    // partes voam 0.9s  → fade-out da tela 1.4s com delay 0.8s → total ~2.2s
    setTimeout(() => {
      setPhase('done');
      onFinish();
    }, 2200);
  }, [phase, onFinish]);


  if (phase === 'done') return null;

  const isOpening = phase === 'opening';

  return (
    <>
      <style>{`
        @keyframes envFadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes topFlyUp {
          0%   { opacity: 1; transform: translateY(0)   scale(1); }
          100% { opacity: 0; transform: translateY(-110vh) scale(0.95); }
        }
        @keyframes botFlyDown {
          0%   { opacity: 1; transform: translateY(0)   scale(1); }
          100% { opacity: 0; transform: translateY(110vh) scale(0.95); }
        }
        @keyframes hintBlink {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.15; }
        }
        @keyframes envAppear {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Overlay de tela cheia */}
      <div
        onClick={handleClick}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0b0b0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: isOpening ? 'default' : 'pointer',
          /* fade-out suave e devagar após as partes voarem */
          animation: isOpening
            ? 'envFadeOut 1.4s ease 0.8s forwards'
            : 'none',
        }}
      >
        {/* Container que ocupa toda a tela, imagens se ajustam dentro */}
        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ── Carta fechada ──────────────────────── */}
          <img
            src={cartaTotal}
            alt="Carta fechada"
            draggable={false}
            style={{
              /* Preenche o maior eixo possível sem cortar */
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: isOpening ? 0 : 1,
              transition: 'opacity 0.12s ease',
              animation: !isOpening ? 'envAppear 0.6s ease forwards' : 'none',
            }}
          />

          {/* ── Parte de cima (voa para cima) ─────── */}
          <img
            src={cartaTop}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: isOpening ? undefined : 0,
              animation: isOpening
                ? 'topFlyUp 0.9s cubic-bezier(0.4, 0, 0.6, 1) forwards'
                : 'none',
            }}
          />

          {/* ── Parte de baixo (voa para baixo) ────── */}
          <img
            src={cartaBot}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: isOpening ? undefined : 0,
              animation: isOpening
                ? 'botFlyDown 0.9s cubic-bezier(0.4, 0, 0.6, 1) forwards'
                : 'none',
            }}
          />

          {/* ── Hint piscante ─────────────────────── */}
          {!isOpening && (
            <div
              style={{
                position: 'absolute',
                bottom: '8vh',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: "'VT323', monospace",
                fontSize: 'clamp(18px, 2.2vw, 26px)',
                letterSpacing: '3px',
                whiteSpace: 'nowrap',
                animation: 'hintBlink 2.2s ease-in-out infinite',
                userSelect: 'none',
              }}
            >
              [ clique para abrir ]
            </div>
          )}
        </div>
      </div>
    </>
  );
}
