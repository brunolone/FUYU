import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SceneLayers() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sky = root.querySelector('.layer-sky');
    const clouds = root.querySelector('.layer-clouds');
    const backtrees = root.querySelector('.layer-backtrees');
    const road = root.querySelector('.layer-road');
    const shadow = root.querySelector('.layer-shadow');
    const particles = root.querySelector('.layer-particles');

    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
    tl.to(sky, { x: -8, y: 4, duration: 24 }, 0);
    tl.to(clouds, { x: 10, y: -6, duration: 28 }, 0);
    tl.to(backtrees, { x: -6, y: 3, duration: 24 }, 0);
    tl.to(road, { x: 4, y: -2, duration: 22 }, 0);
    tl.to(shadow, { opacity: 0.52, duration: 12 }, 0);
    tl.to(particles, { y: -8, duration: 18 }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="scene-layer">
      <div className="layer-sky" />
      <div className="layer-sun" />
      <div className="layer-clouds" />
      <div className="layer-backtrees" />
      <div className="layer-road" />
      <div className="layer-shadow" />
      <div className="layer-particles" />
      <div className="layer-character" />
    </div>
  );
}
