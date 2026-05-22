import { useState, useCallback } from 'react';
import { dialogues, type Choice, type Dialogue } from '../utils/sceneData';

// ── Tipos ──────────────────────────────────────────────────────────────────────

interface ChoiceRecord {
  dialogueId: number;
  choiceText: string;
}

interface UseDialogueReturn {
  current: Dialogue | null;
  selectedChoices: ChoiceRecord[];
  advance: () => void;
  choose: (choice: Choice) => void;
  ended: boolean;
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useDialogue(startId = 1): UseDialogueReturn {
  const [currentId, setCurrentId] = useState<number | null>(startId);
  const [selectedChoices, setSelectedChoices] = useState<ChoiceRecord[]>([]);
  const [ended, setEnded] = useState(false);

  const current = currentId != null
    ? (dialogues.find(d => d.id === currentId) ?? null)
    : null;

  // Avança para a próxima fala (diálogos sem choices)
  const advance = useCallback(() => {
    if (!current) return;
    if (current.next != null) {
      setCurrentId(current.next);
    } else {
      setEnded(true);
    }
  }, [current]);

  // Registra escolha e avança (diálogos com choices)
  const choose = useCallback((choice: Choice) => {
    if (!current) return;
    setSelectedChoices(prev => [
      ...prev,
      { dialogueId: current.id, choiceText: choice.text },
    ]);
    if (choice.next != null) {
      setCurrentId(choice.next);
    } else {
      setEnded(true);
    }
  }, [current]);

  return { current, selectedChoices, advance, choose, ended };
}
