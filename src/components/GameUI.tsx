import { useRef, useEffect } from 'react';
import gsap from 'gsap';

// ── Asset imports ──────────────────────────────────────────────────────────────
import brunoImg   from '../characters/bruno.png';
import ferrImg    from '../characters/ferr.png';

import dialboxGif from '../assets/novos assets/mensagens/dialbox.gif';
import nextBtn    from '../assets/novos assets/mensagens/botoes/next.gif';

import seta1 from '../assets/novos assets/setas/sety1.gif';
import seta2 from '../assets/novos assets/setas/sety2.gif';
import icf1  from '../characters/fer/icones fer/FL11.gif';
import icf2  from '../characters/fer/icones fer/FL2.gif';

// ── State / Data ───────────────────────────────────────────────────────────────
import { useDialogue }      from '../hooks/useDialogue';
import { DIALBOX_ASCII }    from '../utils/ascii';
import type { Choice, Dialogue } from '../utils/sceneData';

// Par seta + ícone para cada choice (2 slots)
const CHOICE_ASSETS = [
  { seta: seta1, icone: icf1 },
  { seta: seta2, icone: icf2 },
];

// ── Dialbox ────────────────────────────────────────────────────────────────────
/**
 * Caixa de diálogo no canto superior esquerdo.
 * - Mostra o texto da fala atual.
 * - Botão "Próximo" aparece apenas quando NÃO há choices.
 * - Quando há choices, o dialbox exibe "..." discreto.
 * - Animação GSAP de fade + slide em cada troca de diálogo.
 */
interface DialboxProps {
  dialogue: Dialogue;
  previous: Dialogue | null;
  onNext: () => void;
  ended: boolean;
}

function Dialbox({ dialogue, previous, onNext, ended }: DialboxProps) {
  const btnRef  = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const boxRef  = useRef<HTMLDivElement>(null);

  const hasChoices = !!dialogue.choices?.length;
  const displayText = hasChoices
    ? (previous?.text || '...')
    : ended
    ? '...'
    : dialogue.text;
  
  const displaySpeaker = hasChoices
    ? (previous?.speaker === 'player' ? 'bruno' : previous?.speaker)
    : (dialogue.speaker === 'player' ? 'bruno' : dialogue.speaker);

  // ── Anima texto a cada troca de diálogo ───────────────────────────────────
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.1 },
    );
  }, [dialogue.id]);

  // ── Pulsar suave no botão Próximo ─────────────────────────────────────────
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

  return (
    <div
      ref={boxRef}
      style={{
        position: 'absolute',
        top: '3%',
        left: '1.5%',
        width: '44%',
        aspectRatio: '1.78 / 1',
        zIndex: 20,
        overflow: 'visible',
        containerType: 'size',
      }}
    >
      {/* Background ASCII */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'rgba(252, 245, 235, 0.85)',
          backdropFilter: 'blur(4px)',
          borderRadius: '8px',
          border: '1px solid rgba(122, 92, 58, 0.15)',
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
        {/* Speaker label — exibido para falas e persistido em escolhas */}
        {!ended && (
          <span
            style={{
              fontFamily: "'Roboto Mono', monospace",
              fontSize: 'clamp(0.55rem, 0.85vw, 0.75rem)',
              color: '#7a5c3a',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.15em',
            }}
          >
            {displaySpeaker}
          </span>
        )}

        <p
          ref={textRef}
          style={{
            fontFamily: "'Roboto Mono', monospace",
            fontSize: 'clamp(0.75rem, 1.25vw, 1.1rem)',
            color: hasChoices ? '#b09070' : '#1e1208',
            lineHeight: 1.75,
            margin: 0,
            letterSpacing: '0.015em',
            whiteSpace: 'pre-wrap',
            fontStyle: hasChoices ? 'italic' : 'normal',
          }}
        >
          {displayText}
        </p>
      </div>

      {/* Botão Próximo — só aparece quando não há choices */}
      {!hasChoices && !ended && (
        <img
          ref={btnRef}
          src={nextBtn}
          alt="avançar"
          draggable={false}
          onClick={onNext}
          style={{
            position: 'absolute',
            bottom: '-4%',
            right: '-2%',
            height: 'clamp(38px, 5.5vh, 62px)',
            width: 'auto',
            cursor: 'pointer',
            zIndex: 30,
            transformOrigin: 'center',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
          }}
        />
      )}
    </div>
  );
}

// ── Personagem Bruno ───────────────────────────────────────────────────────────
function BrunoCharacter() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -5, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });
  }, []);
  return (
    <img
      ref={ref}
      src={brunoImg}
      alt="Bruno"
      draggable={false}
      style={{
        position: 'absolute',
        bottom: '0%',
        left: '33%',
        height: '62%',
        width: 'auto',
        zIndex: 15,
        filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))',
        transformOrigin: 'bottom center',
      }}
    />
  );
}

// ── Personagem Fer ─────────────────────────────────────────────────────────────
function FerCharacter() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -3, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5,
    });
  }, []);
  return (
    <img
      ref={ref}
      src={ferrImg}
      alt="Fer"
      draggable={false}
      style={{
        position: 'absolute',
        bottom: '0%',
        left: '52%',
        height: '30%',
        width: 'auto',
        zIndex: 13,
        filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.35)) brightness(0.88)',
        transformOrigin: 'bottom center',
      }}
    />
  );
}

// ── Painel de Escolhas ─────────────────────────────────────────────────────────
/**
 * Renderiza as choices de Fernanda como setas + ícones orgânicos.
 * Animação de entrada staggered com GSAP — sensação de "papel surgindo".
 * Hover com scale + rotação mínima.
 */
interface ChoiceRowsProps {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
}

function ChoiceRows({ choices, onChoose }: ChoiceRowsProps) {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Entrada animada a cada novo conjunto de choices ────────────────────────
  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    // Reset antes de animar (evita posições residuais)
    gsap.set(els, { opacity: 0, y: 14, rotation: 0 });

    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: 'back.out(1.3)',
      delay: 0.25,
    });
  }, [choices]);

  const handleEnter = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1.06, rotation: 1.8, duration: 0.2, ease: 'power1.out' });
  };

  const handleLeave = (el: HTMLDivElement) => {
    gsap.to(el, { scale: 1, rotation: 0, duration: 0.28, ease: 'power1.inOut' });
  };

  const handleClick = (el: HTMLDivElement, choice: Choice) => {
    const allEls = rowRefs.current.filter(Boolean) as HTMLDivElement[];

    // 1. Leve "pressão" na row clicada
    gsap.to(el, {
      scale: 0.92,
      duration: 0.12,
      ease: 'power2.in',
      onComplete: () => {
        // 2. Fade-out suave de todas as choices antes de avançar
        gsap.to(allEls, {
          opacity: 0,
          y: -10,
          duration: 0.65,
          stagger: 0.08,
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
        top: '28%',
        left: '58%',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(6px, 1.3vh, 16px)',
      }}
    >
      {choices.map((choice, i) => {
        const assets = CHOICE_ASSETS[i % CHOICE_ASSETS.length];
        return (
          <div
            key={`${choice.text}-${i}`}
            ref={el => { rowRefs.current[i] = el; }}
            onClick={e => handleClick(e.currentTarget, choice)}
            onMouseEnter={e => handleEnter(e.currentTarget)}
            onMouseLeave={e => handleLeave(e.currentTarget)}
            title={choice.text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 1.2vw, 16px)',
              cursor: 'pointer',
              transformOrigin: 'center left',
            }}
          >
            {/* Seta */}
            <img
              src={assets.seta}
              alt={choice.text}
              draggable={false}
              style={{
                height: 'clamp(52px, 7.5vh, 90px)',
                width: 'auto',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                pointerEvents: 'none',
              }}
            />
            {/* Ícone animado */}
            <img
              src={assets.icone}
              alt={`ícone ${i + 1}`}
              draggable={false}
              style={{
                height: 'clamp(52px, 7.5vh, 90px)',
                width: 'auto',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ── Tela de fim ────────────────────────────────────────────────────────────────
function EndOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5, ease: 'power2.out', delay: 0.4 },
    );
  }, []);
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(18, 10, 4, 0.55)',
        backdropFilter: 'blur(2px)',
        pointerEvents: 'none',
      }}
    >
      <p
        style={{
          fontFamily: "'Roboto Mono', monospace",
          fontSize: 'clamp(0.75rem, 1.5vw, 1.1rem)',
          color: 'rgba(248, 230, 195, 0.7)',
          letterSpacing: '0.18em',
          textTransform: 'lowercase',
          fontStyle: 'italic',
        }}
      >
        …
      </p>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function GameUI() {
  const { current, previous, advance, choose, ended } = useDialogue(1);

  if (!current) return null;

  const hasChoices = !!current.choices?.length;

  return (
    <>
      {/* Caixa de diálogo — sempre visível */}
      <Dialbox
        dialogue={current}
        previous={previous}
        onNext={advance}
        ended={ended}
      />

      {/* Personagens */}
      {/* <BrunoCharacter /> */}
      {/* <FerCharacter /> */}

      {/* Choices — visíveis apenas quando é a vez de Fernanda */}
      {hasChoices && !ended && (
        <ChoiceRows
          choices={current.choices!}
          onChoose={choose}
        />
      )}

      {/* Tela de encerramento suave */}
      {ended && <EndOverlay />}
    </>
  );
}
