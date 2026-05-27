/**
 * Importa o primeiro arquivo de áudio encontrado em assets/sound
 * usando import.meta.glob para evitar problemas com nomes em japonês.
 */
const soundModules = import.meta.glob('../audio/*.mp3', {
  eager: true,
  query: '?url',
  import: 'default',
});

const bgmUrl = Object.values(soundModules)[0] as string;

let audioInstance: HTMLAudioElement | null = null;

export function getBGM(): HTMLAudioElement {
  if (!audioInstance) {
    audioInstance = new Audio(bgmUrl);
    audioInstance.loop = true;
    audioInstance.volume = 0;
  }
  return audioInstance;
}

/** Inicia a música com fade-in suave */
export function playBGM(targetVolume = 0.35, fadeDurationMs = 2000) {
  const audio = getBGM();

  audio.play().catch(() => {
    // Autoplay bloqueado — tudo bem, o usuário já interagiu via clique
  });

  const steps = 60;
  const interval = fadeDurationMs / steps;
  const increment = targetVolume / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= targetVolume) {
      audio.volume = targetVolume;
      clearInterval(timer);
    } else {
      audio.volume = current;
    }
  }, interval);
}

/** Para a música com fade-out suave */
export function stopBGM(fadeDurationMs = 1500) {
  const audio = getBGM();
  const start = audio.volume;
  const steps = 40;
  const interval = fadeDurationMs / steps;
  const decrement = start / steps;
  let current = start;

  const timer = setInterval(() => {
    current -= decrement;
    if (current <= 0) {
      audio.volume = 0;
      audio.pause();
      clearInterval(timer);
    } else {
      audio.volume = current;
    }
  }, interval);
}
