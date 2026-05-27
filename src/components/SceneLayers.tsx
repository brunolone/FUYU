import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

// Componente de Partículas (Poeira flutuante)
function DustParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const particles = containerRef.current.children;

    Array.from(particles).forEach((p) => {
      gsap.to(p, {
        y: `-=${gsap.utils.random(20, 40)}`,
        x: `+=${gsap.utils.random(-15, 15)}`,
        opacity: gsap.utils.random(0.1, 0.4),
        duration: gsap.utils.random(6, 12),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: gsap.utils.random(0, 5)
      });
    });
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-orange-200 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.15,
          filter: 'blur(1px)',
        }}
      />
    ));
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles}
    </div>
  );
}

// Importando as imagens do diretório
// @ts-expect-error — vite-imagetools returns string URL with ?format query
import skyImg from '../backgrounds/sky.png?format=webp&quality=80';
// @ts-expect-error
import bgImg from '../backgrounds/backegrounde.png?format=webp&quality=75';
// @ts-expect-error
import tree1Img from '../backgrounds/tree1.png?format=webp&quality=80';
// @ts-expect-error
import treeImg from '../backgrounds/tree.png?format=webp&quality=80';
import folhaGif from '../backgrounds/folha.gif'; // GIF animado — não converter

export default function SceneLayers() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sky = root.querySelector('.layer-sky');
    const bg = root.querySelector('.layer-bg');
    const tree1 = root.querySelector('.layer-tree1');
    const tree = root.querySelector('.layer-tree');


    // Parallax interativo suave com o mouse
    const handleMouseMove = (e: MouseEvent) => {
      // Normalizando as coordenadas de -1 a 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Movimentação em profundidade (valores menores = mais longe)
      gsap.to(sky, { x: x * -4, y: y * -2, duration: 3, ease: "power2.out" });
      gsap.to(bg, { x: x * -8, y: y * -4, duration: 3, ease: "power2.out" });
      gsap.to(tree1, { x: x * -14, y: y * -6, duration: 3, ease: "power2.out" });
      gsap.to(tree, { x: x * -22, y: y * -10, duration: 3, ease: "power2.out" });
    };

    // Necessário usar o document body para pegar o evento na tela toda
    document.addEventListener('mousemove', handleMouseMove);

    // Timeline de idle (vento/respiração) constante e bem lenta
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });

    // Camera Breathing (Movimento imperceptível de toda a cena)
    tl.to(root, { y: 2, duration: 6 }, 0);

    // Movimento sutil do fundo para auxiliar no Heat Haze
    tl.to(sky, { scale: 1.01, y: 1, duration: 12 }, 0);
    tl.to(bg, { scale: 1.015, y: -1, duration: 10 }, 0);

    // Idle Wind (árvores oscilando 1~3px)
    tl.to(tree1, { rotation: 0.3, x: 2, transformOrigin: "bottom center", duration: 8 }, 0);
    tl.to(tree, { rotation: -0.4, x: -3, transformOrigin: "bottom center", duration: 9 }, 0);

    // Idle da Luz (Heat Haze / Variação de intensidade)
    if (lightRef.current) {
      tl.to(lightRef.current, { opacity: 0.16, duration: 7 }, 0);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      tl.kill();
    };
  }, []);

  return (
    // inset-[-5%] faz as imagens passarem da borda para esconder buracos do parallax
    <div ref={rootRef} className="scene-layer overflow-hidden">
      <div
        className="layer-sky absolute inset-[-5%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${skyImg})`, transform: 'scaleX(-1)' }}
      />
      <div
        className="layer-bg absolute inset-[-5%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${bgImg})`, transform: 'scaleX(-1)' }}
      />

      <div
        className="layer-tree absolute inset-[-5%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${treeImg})`, transform: 'scaleX(-1)' }}
      />

      {/* Partículas Atmosféricas (Poeira iluminada) */}
      <DustParticles />

      {/* Camada de Folhas Caindo (GIF) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-normal"
        style={{
          backgroundImage: `url(${folhaGif})`,
          backgroundSize: '250px', // Deixa as folhas bem menores
          backgroundRepeat: 'repeat' // Multiplica o gif para cobrir toda a tela
        }}
      />

      {/* Camada de Filtro de Luz Quente para Estética Final de Tarde + Heat Haze */}
      <div
        ref={lightRef}
        className="absolute inset-0 bg-orange-500 mix-blend-overlay opacity-10 pointer-events-none will-change-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#251508] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
