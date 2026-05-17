import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

// ── Asset imports ──────────────────────────────────────────────────────────────
import brunoImg   from '../characters/bruno.png';
import ferrImg    from '../characters/ferr.png';

import dialboxGif from '../assets/novos assets/mensagens/dialbox.gif';
import nextBtn    from '../assets/novos assets/mensagens/botoes/next.gif';

// Setas emparelhadas com os ícones
import seta1 from '../assets/novos assets/setas/sety1.gif';
import seta2 from '../assets/novos assets/setas/sety2.gif';
import seta3 from '../assets/novos assets/setas/sety3.gif';
import seta4 from '../assets/novos assets/setas/sety4.gif';

import icf1 from '../assets/novos assets/icones fer/icf1r.gif';
import icf2 from '../assets/novos assets/icones fer/icf2.gif';
import icf3 from '../assets/novos assets/icones fer/icf3.gif';
import icf4 from '../assets/novos assets/icones fer/icf4.gif';

// ── Dados ──────────────────────────────────────────────────────────────────────
const CHOICES = [
  { seta: seta1, icone: icf1, label: 'Opção 1' },
  { seta: seta2, icone: icf2, label: 'Opção 2' },
  { seta: seta3, icone: icf3, label: 'Opção 3' },
  { seta: seta4, icone: icf4, label: 'Opção 4' },
];

// ── Dialbox ────────────────────────────────────────────────────────────────────
/**
 * Caixa de diálogo no canto superior esquerdo.
 * O frame (dialbox.gif) é renderizado com mix-blend-mode: multiply
 * para que o fundo da cena apareça transluzindo pelo interior branco.
 * O botão OK fica fora/sobreposto à borda inferior direita da caixa.
 */
function Dialbox() {
  const btnRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!btnRef.current) return;
    // Pulsar suave no botão OK
    gsap.to(btnRef.current, {
      scale: 1.1,
      duration: 0.85,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    /*
     * Wrapper posicionado: top-left, largura ~44% da tela, altura proporcional.
     * Usa `overflow: visible` para o botão OK aparecer fora da caixa.
     */
    <div
      style={{
        position: 'absolute',
        top: '3%',
        left: '1.5%',
        width: '44%',
        aspectRatio: '1.78 / 1',   /* ~16:9 ajustado */
        zIndex: 20,
        overflow: 'visible',
      }}
    >
      {/*
       * Frame do dialbox — renderizado com opacidade reduzida para que
       * o interior semi-translúcido revele a cena atrás, como na referência.
       */}
      <img
        src={dialboxGif}
        alt="caixa de diálogo"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'fill',
          opacity: 0.82,
          zIndex: 1,
        }}
      />

      {/* Texto do diálogo — dentro do frame, acima do fundo */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '6%',
          right: '6%',
          bottom: '14%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '3%',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
            color: '#1e1208',
            lineHeight: 1.7,
            margin: 0,
            letterSpacing: '0.015em',
          }}
        >
          O vento passava pela rua como se soubesse de algo que eu ainda não sabia…
        </p>
      </div>

      {/*
       * Botão OK — posicionado na borda inferior direita, sobrepondo a borda.
       * Na referência ele aparece quase "fora" da caixa, grande e clicável.
       */}
      <img
        ref={btnRef}
        src={nextBtn}
        alt="avançar"
        draggable={false}
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
    </div>
  );
}

// ── Personagem Bruno ───────────────────────────────────────────────────────────
/**
 * Bruno — personagem em pé no centro-esquerdo da cena.
 * Na referência ele é menor e mais para a esquerda que Fer
 * (em termos de tela, fica por volta de 33-36% do left).
 */
function BrunoCharacter() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Respiração suave — 5px de flutuação vertical
    gsap.to(ref.current, {
      y: -5,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
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
        height: '62%',      /* Menor que antes — mais proporcional ao fundo */
        width: 'auto',
        zIndex: 15,
        filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))',
        transformOrigin: 'bottom center',
      }}
    />
  );
}

// ── Personagem Fer ─────────────────────────────────────────────────────────────
/**
 * Fer — sentada, mais à direita e bem menor (sensação de profundidade).
 * Na referência ela está em torno de 49-52% do left, ~30% de altura.
 */
function FerCharacter() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -3,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
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
        left: '52%',        /* Entre Bruno e o painel de escolhas */
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
 * Setas + ícones de Fer empilhados verticalmente.
 * Na referência ficam no centro-direito da tela (não colados à borda),
 * com as setas e ícones bem maiores.
 */
function ChoiceRows() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        position: 'absolute',
        top: '28%',          /* Mais para o meio-baixo — como na referência */
        left: '58%',         /* Centro-direito da tela */
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(6px, 1.3vh, 16px)',
      }}
    >
      {CHOICES.map((choice, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.2vw, 16px)',
            cursor: 'pointer',
            transition: 'transform 0.18s ease, filter 0.18s ease',
            transform: hovered === i ? 'translateX(-8px) scale(1.04)' : 'translateX(0) scale(1)',
            filter: hovered === i ? 'brightness(1.2)' : 'brightness(1)',
          }}
        >
          {/* Seta — tamanho generoso como na referência */}
          <img
            src={choice.seta}
            alt={choice.label}
            draggable={false}
            style={{
              height: 'clamp(52px, 7.5vh, 90px)',
              width: 'auto',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
            }}
          />
          {/* Ícone animado de Fer — mesmo porte que a seta */}
          <img
            src={choice.icone}
            alt={`ícone ${i + 1}`}
            draggable={false}
            style={{
              height: 'clamp(52px, 7.5vh, 90px)',
              width: 'auto',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))',
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function GameUI() {
  return (
    <>
      <Dialbox />
      <BrunoCharacter />
      <FerCharacter />
      <ChoiceRows />
    </>
  );
}
