import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Importando as imagens do diretório
import skyImg from '../backgrounds/sky.png';
import bgImg from '../backgrounds/background.jpg';
import tree1Img from '../backgrounds/tree1.png';
import treeImg from '../backgrounds/tree.png';

export default function SceneLayers() {
  const rootRef = useRef<HTMLDivElement | null>(null);

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
    tl.to(sky, { scale: 1.01, duration: 12 }, 0);
    tl.to(bg, { scale: 1.015, duration: 10 }, 0);
    tl.to(tree1, { rotation: 0.3, transformOrigin: "bottom center", duration: 8 }, 0);
    tl.to(tree, { rotation: -0.4, transformOrigin: "bottom center", duration: 9 }, 0);

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
        style={{ backgroundImage: `url(${skyImg})` }} 
      />
      <div 
        className="layer-bg absolute inset-[-5%] bg-cover bg-center will-change-transform" 
        style={{ backgroundImage: `url(${bgImg})` }} 
      />
      <div 
        className="layer-tree1 absolute inset-[-5%] bg-cover bg-center will-change-transform" 
        style={{ backgroundImage: `url(${tree1Img})` }} 
      />
      <div 
        className="layer-tree absolute inset-[-5%] bg-cover bg-center will-change-transform" 
        style={{ backgroundImage: `url(${treeImg})` }} 
      />
      
      {/* Camada de Filtro de Luz Quente para Estética Final de Tarde */}
      <div className="absolute inset-0 bg-orange-500 mix-blend-overlay opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#251508] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
