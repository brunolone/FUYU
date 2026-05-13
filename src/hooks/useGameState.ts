import { useEffect, useMemo, useRef, useState } from 'react';
import { scenes } from '../utils/sceneData';
import { defaultGameState, GameState } from '../state/gameState';
import { createSessionReport, saveSession } from '../utils/session';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const startTime = useRef<number>(Date.now());

  const currentScene = scenes[sceneIndex];
  const isSceneComplete = dialogueIndex >= currentScene.lines.length;
  const isFinalScene = sceneIndex === scenes.length - 1;
  const activeChoices = useMemo(() => currentScene.choices ?? [], [currentScene]);
  const currentLine = currentScene.lines[Math.min(dialogueIndex, currentScene.lines.length - 1)];

  useEffect(() => {
    if (isFinalScene && isSceneComplete) {
      const report = createSessionReport(gameState, Date.now() - startTime.current);
      saveSession(report).catch(() => {
        // Falha silenciosa: guarda no localStorage como fallback
      });
    }
  }, [isFinalScene, isSceneComplete, gameState]);

  function advanceDialogue() {
    if (isSceneComplete) return;
    setDialogueIndex((current) => current + 1);
  }

  function chooseOption(choiceId: string) {
    const option = activeChoices.find((entry) => entry.id === choiceId);
    if (!option) return;

    setGameState((prev) => ({
      friendship: prev.friendship + option.friendshipDelta,
      choices: [...prev.choices, choiceId],
      easterEggsFound: option.easterEgg ? [...prev.easterEggsFound, option.easterEgg] : prev.easterEggsFound,
      ending: option.ending ?? prev.ending
    }));

    setSceneIndex((current) => Math.min(current + 1, scenes.length - 1));
    setDialogueIndex(0);
  }

  function nextScene() {
    if (!isSceneComplete) return;
    setSceneIndex((current) => Math.min(current + 1, scenes.length - 1));
    setDialogueIndex(0);
  }

  return {
    gameState,
    currentScene,
    currentLine,
    activeChoices,
    isSceneComplete,
    isFinalScene,
    advanceDialogue,
    chooseOption,
    nextScene
  };
}
