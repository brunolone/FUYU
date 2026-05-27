import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

// ── Asset imports ──────────────────────────────────────────────────────────────
import opAborrecida from '../characters/fer/novas op/aborrecida.gif';
import opAinda from '../characters/fer/novas op/ainda.gif';
import opBrava from '../characters/fer/novas op/brava.gif';
import opHehe from '../characters/fer/novas op/hehe.gif';
import opQue from '../characters/fer/novas op/que (2).gif';
import neyGif from '../backgrounds/ney.gif';
import finalGif from './final.gif';

// ── State / Data ───────────────────────────────────────────────────────────────
import { useDialogue }      from '../hooks/useDialogue';
import { DIALBOX_ASCII }    from '../utils/ascii';
import { saveFinalResponse } from '../utils/session';
import type { Choice, Dialogue } from '../utils/sceneData';

const EXPRESSION_GIFS = {
  aborrecida: opAborrecida,
  ainda: opAinda,
  brava: opBrava,
  hehe: opHehe,
  que: opQue,
};

// ── Dialbox ────────────────────────────────────────────────────────────────────
interface DialboxProps {
  dialogue: Dialogue;
  previous: Dialogue | null;
  onNext: () => void;
  ended: boolean;
  isMobile: boolean;
}

function Dialbox({ dialogue, previous, onNext, ended, isMobile }: DialboxProps) {
  const btnRef  = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const boxRef  = useRef<HTMLDivElement>(null);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const hasChoices = !!dialogue.choices?.length;
  const displayText = hasChoices
    ? (previous?.text || '...')
    : ended
    ? '...'
    : dialogue.text;
  
  const displaySpeaker = hasChoices
    ? (previous?.speaker === 'player' ? 'bruno' : previous?.speaker)
    : (dialogue.speaker === 'player' ? 'bruno' : dialogue.speaker);

  useEffect(() => {
    const el = textRef.current;
    if (!el || hasChoices) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 },
    );
  }, [dialogue.id, hasChoices]);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || hasChoices) return;
    const tween = gsap.to(btn, {
      scale: 1.08,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
    return () => { tween.kill(); };
  }, [hasChoices, dialogue.id]);

  // ── Mobile: layout de fluxo — altura cresce com o conteúdo ────────────────
  if (isMobile) {
    return (
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: '3%',
          left: '4%',
          width: '92%',
          zIndex: 20,
          // Glassmorphism aplicado diretamente — sem aspectRatio fixo
          backgroundColor: 'rgba(252, 245, 235, 0.82)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          border: '1.5px solid rgba(122, 92, 58, 0.25)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
          padding: '14px 18px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4em',
        }}
      >
        {/* Speaker label */}
        {!ended && (
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 'clamp(0.6rem, 3vw, 0.85rem)',
              color: '#9c6f44',
              fontWeight: 'bold',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            {displaySpeaker}
          </span>
        )}

        <p
          ref={textRef}
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 'clamp(0.75rem, 3.8vw, 1.05rem)',
            color: '#1e1208',
            lineHeight: 1.5,
            margin: 0,
            letterSpacing: '0.015em',
            whiteSpace: 'pre-wrap',
            fontWeight: 500,
          }}
        >
          {displayText}
        </p>

        {/* Botão Próximo — inline, abaixo do texto */}
        {!hasChoices && !ended && (
          <button
            ref={btnRef}
            onClick={onNext}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            style={{
              alignSelf: 'flex-end',
              marginTop: '6px',
              padding: '8px 18px',
              backgroundColor: isBtnHovered ? '#7a5c3a' : 'rgba(252, 245, 235, 0.95)',
              color: isBtnHovered ? '#ffffff' : '#7a5c3a',
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 'clamp(0.7rem, 3vw, 0.9rem)',
              fontWeight: 'bold',
              border: '2px solid rgba(122, 92, 58, 0.55)',
              borderRadius: '24px',
              cursor: 'pointer',
              zIndex: 30,
              transformOrigin: 'center',
              boxShadow: isBtnHovered ? '0 10px 24px rgba(122, 92, 58, 0.35)' : '0 8px 20px rgba(0,0,0,0.18)',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ display: 'inline-block', fontSize: '0.95rem', transform: isBtnHovered ? 'rotate(180deg) scale(1.15)' : 'rotate(0deg) scale(1)', transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', color: isBtnHovered ? '#fcf5eb' : '#9c6f44' }}>✿</span>
            <span style={{ opacity: 0.6, fontSize: '0.75rem', letterSpacing: '-1.5px', userSelect: 'none' }}>──</span>
            <span style={{ fontSize: '0.8rem' }}>Próximo</span>
            <div style={{ display: 'flex', alignItems: 'center', transform: isBtnHovered ? 'translateX(5px)' : 'translateX(0px)', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <span style={{ opacity: 0.6, fontSize: '0.75rem', letterSpacing: '-1.5px', userSelect: 'none', marginRight: '2px' }}>──</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', lineHeight: 1 }}>➔</span>
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      style={{
        position: 'absolute',
        top: '3%',
        left: isMobile ? '4%' : '1.5%',
        width: isMobile ? '92%' : '44%',
        aspectRatio: isMobile ? '2.4 / 1' : '1.78 / 1',
        zIndex: 20,
        overflow: 'visible',
        containerType: 'size',
      }}
    >
      {/* Background ASCII com Glassmorphism */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'rgba(252, 245, 235, 0.82)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          border: '1.5px solid rgba(122, 92, 58, 0.25)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
        }}
      >
        <pre
          style={{
            margin: 0,
            pointerEvents: 'none',
            fontFamily: "'Roboto Mono', monospace",
            fontSize: '3cqh',
            lineHeight: '3cqh',
            color: 'rgba(30, 18, 8, 0.45)',
            whiteSpace: 'pre',
          }}
        >
          {DIALBOX_ASCII}
        </pre>
      </div>

      {/* Área de texto */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '6%',
          right: '6%',
          bottom: '14%',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: '3%',
          gap: '0.35em',
        }}
      >
        {/* Speaker label */}
        {!ended && (
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: isMobile ? 'clamp(0.6rem, 3vw, 0.85rem)' : 'clamp(0.6rem, 1vw, 0.85rem)',
              color: '#9c6f44',
              fontWeight: 'bold',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.15em',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
            }}
          >
            {displaySpeaker}
          </span>
        )}

        <p
          ref={textRef}
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: isMobile ? 'clamp(0.75rem, 3.8vw, 1.05rem)' : 'clamp(0.8rem, 1.35vw, 1.25rem)',
            color: '#1e1208',
            lineHeight: isMobile ? 1.4 : 1.65,
            margin: 0,
            letterSpacing: '0.015em',
            whiteSpace: 'pre-wrap',
            fontWeight: 500,
          }}
        >
          {displayText}
        </p>
      </div>

      {/* Botão Próximo */}
      {!hasChoices && !ended && (
        <button
          ref={btnRef}
          onClick={onNext}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          style={{
            position: 'absolute',
            bottom: isMobile ? '-14px' : '-6%',
            right: isMobile ? '10px' : '-2%',
            padding: isMobile ? '8px 18px' : '10px 24px',
            backgroundColor: isBtnHovered ? '#7a5c3a' : 'rgba(252, 245, 235, 0.95)',
            color: isBtnHovered ? '#ffffff' : '#7a5c3a',
            fontFamily: "'Roboto Mono', monospace",
            fontSize: isMobile ? 'clamp(0.7rem, 3vw, 0.9rem)' : 'clamp(0.75rem, 1.25vw, 1.1rem)',
            fontWeight: 'bold',
            border: '2px solid rgba(122, 92, 58, 0.55)',
            borderRadius: '24px',
            cursor: 'pointer',
            zIndex: 30,
            transformOrigin: 'center',
            boxShadow: isBtnHovered ? '0 10px 24px rgba(122, 92, 58, 0.35)' : '0 8px 20px rgba(0,0,0,0.18)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '4px' : '8px',
          }}
        >
          {/* Flor decorativa à esquerda */}
          <span
            style={{
              display: 'inline-block',
              fontSize: isMobile ? '0.95rem' : '1.25rem',
              transform: isBtnHovered ? 'rotate(180deg) scale(1.15)' : 'rotate(0deg) scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: isBtnHovered ? '#fcf5eb' : '#9c6f44',
            }}
          >
            ✿
          </span>
          
          {/* Haste da seta */}
          <span style={{ opacity: 0.6, fontSize: isMobile ? '0.75rem' : '0.9rem', letterSpacing: '-1.5px', userSelect: 'none' }}>──</span>
          
          <span style={{ fontSize: isMobile ? '0.8rem' : '0.95rem' }}>Próximo</span>
          
          {/* Haste e cabeça da seta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              transform: isBtnHovered ? 'translateX(5px)' : 'translateX(0px)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <span style={{ opacity: 0.6, fontSize: isMobile ? '0.75rem' : '0.9rem', letterSpacing: '-1.5px', userSelect: 'none', marginRight: '2px' }}>──</span>
            <span style={{ fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 'bold', lineHeight: 1 }}>➔</span>
          </div>
        </button>
      )}
    </div>
  );
}

// ── Painel de Escolhas ─────────────────────────────────────────────────────────
interface ChoiceRowsProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
  isMobile: boolean;
}

function ChoiceRows({ choices, onChoose, isMobile }: ChoiceRowsProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    gsap.set(els, { opacity: 0, y: 20, scale: 0.95 });

    gsap.to(els, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.12,
      ease: 'back.out(1.4)',
      delay: 0.15,
    });
  }, [choices]);

  const handleEnter = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', duration: 0.22, ease: 'power1.out' });
  };

  const handleLeave = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1, y: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', duration: 0.28, ease: 'power1.inOut' });
  };

  const handleClick = (el: HTMLDivElement, choice: Choice) => {
    const allEls = rowRefs.current.filter(Boolean) as HTMLDivElement[];

    gsap.to(el, {
      scale: 0.94,
      duration: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(allEls, {
          opacity: 0,
          y: -15,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.in',
          onComplete: () => {
            onChoose(choice);
          },
        });
      },
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: isMobile ? '38%' : '22%',
        left: isMobile ? '5%' : '50%',
        width: isMobile ? '90%' : 'auto',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '16px' : 'clamp(16px, 3.2vh, 40px)',
      }}
    >
      {choices.map((choice, i) => {
        const icon = EXPRESSION_GIFS[choice.reaction];
        return (
          <div
            key={`${choice.text}-${i}`}
            ref={el => { rowRefs.current[i] = el; }}
            onClick={e => handleClick(e.currentTarget, choice)}
            onMouseEnter={e => handleEnter(e.currentTarget)}
            onMouseLeave={e => handleLeave(e.currentTarget)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '16px' : '32px',
              cursor: 'pointer',
              transformOrigin: isMobile ? 'center' : 'center left',
              padding: isMobile ? '12px 20px' : '24px 40px',
              backgroundColor: 'rgba(252, 245, 235, 0.88)',
              border: isMobile ? '1.5px solid rgba(122, 92, 58, 0.3)' : '2.5px solid rgba(122, 92, 58, 0.35)',
              borderRadius: isMobile ? '16px' : '32px',
              boxShadow: isMobile ? '0 6px 16px rgba(0,0,0,0.12)' : '0 12px 32px rgba(0,0,0,0.18)',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Ícone animado da reação */}
            <img
              src={icon}
              alt={`reacao-${choice.reaction}`}
              draggable={false}
              style={{
                height: isMobile ? 'clamp(50px, 8vh, 70px)' : 'clamp(92px, 14vh, 140px)',
                width: 'auto',
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.18))',
                pointerEvents: 'none',
                borderRadius: isMobile ? '8px' : '16px',
                flexShrink: 0,
              }}
            />
            {/* Texto da choice */}
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: isMobile ? 'clamp(0.75rem, 3.2vw, 1rem)' : 'clamp(1.7rem, 2.5vw, 2.4rem)',
                color: '#1e1208',
                fontWeight: 600,
                wordBreak: 'break-word',
              }}
            >
              {choice.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Tela de fim ────────────────────────────────────────────────────────────────
interface EndOverlayProps {
  finalChoiceText: string | null;
}

function EndOverlay({ finalChoiceText }: EndOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power2.out', delay: 0.4 },
    );
  }, []);

  const isGreen = finalChoiceText?.includes("verde");
  const isBlue = finalChoiceText?.includes("tom de azul");

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(18, 10, 4, 0.75)',
        backdropFilter: 'blur(3px)',
        pointerEvents: 'none',
        gap: '24px',
      }}
    >
      {/* Caso escolha verde, mostra a imagem do ney no centro com a mensagem */}
      {isGreen && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <img
            src={neyGif}
            alt="Ney"
            style={{
              maxWidth: '480px',
              width: '85%',
              height: 'auto',
              borderRadius: '24px',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.65)',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.45))',
            }}
          />
          <p
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 'clamp(1rem, 2vw, 1.45rem)',
              color: '#f8e6c3',
              textAlign: 'center',
              fontWeight: 600,
              letterSpacing: '0.05em',
              margin: '10px 0 0 0',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
            }}
          >
            "Fica assim então, ah droga..."
          </p>
        </div>
      )}

      {/* Caso escolha azul, mostra o gif do celular recortado (final.gif) no centro com a mensagem */}
      {isBlue && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <img
            src={finalGif}
            alt="Celular"
            style={{
              maxWidth: '480px',
              width: '85%',
              height: 'auto',
              borderRadius: '24px',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.65)',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.45))',
            }}
          />
          <p
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 'clamp(1rem, 2vw, 1.45rem)',
              color: '#f8e6c3',
              textAlign: 'center',
              fontWeight: 600,
              letterSpacing: '0.05em',
              margin: '10px 0 0 0',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.6)',
            }}
          >
            "Então avisa suas amigas que elas vão morar na lua, porque eu vou te dar o mundo"
          </p>
        </div>
      )}
      
      {/* Efeito dos 3 pontos no rodapé/centro */}
      <p
        style={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
          color: 'rgba(248, 230, 195, 0.7)',
          letterSpacing: '0.18em',
          textTransform: 'lowercase',
          fontStyle: 'italic',
          margin: 0,
        }}
      >
        …
      </p>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function GameUI() {
  const { current, previous, advance, choose, ended, selectedChoices } = useDialogue(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!current) return null;

  const hasChoices = !!current.choices?.length;

  const finalChoiceText = selectedChoices.find(c => c.dialogueId === 15)?.choiceText ?? null;

  // ── Salva no Supabase quando o jogo termina ────────────────────────────────
  useEffect(() => {
    if (!ended || !finalChoiceText) return;
    saveFinalResponse({
      escolha_final:  finalChoiceText,
      todas_escolhas: selectedChoices,
    });
  }, [ended, finalChoiceText]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Caixa de diálogo */}
      <Dialbox
        dialogue={current}
        previous={previous}
        onNext={advance}
        ended={ended}
        isMobile={isMobile}
      />

      {/* Choices — com GIFs correspondentes nos botões */}
      {hasChoices && !ended && (
        <ChoiceRows
          choices={current.choices!}
          onChoose={choose}
          isMobile={isMobile}
        />
      )}

      {/* Tela de encerramento de tela apagando com 3 pontos (e ney.gif se for verde) */}
      {ended && <EndOverlay finalChoiceText={finalChoiceText} />}
    </>
  );
}
