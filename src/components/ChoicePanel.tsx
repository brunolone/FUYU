import type { ChoiceOption } from '../utils/sceneData';

interface ChoicePanelProps {
  choices: ChoiceOption[];
  hasChoices: boolean;
  onChoose: (choiceId: string) => void;
  onAdvance: () => void;
}

export default function ChoicePanel({ choices, hasChoices, onChoose, onAdvance }: ChoicePanelProps) {
  if (hasChoices) {
    return (
      <div className="space-y-3">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            className="w-full rounded-3xl border border-white/15 bg-white/5 px-4 py-3 text-left text-white/85 transition hover:border-sun hover:bg-white/10"
            onClick={() => onChoose(choice.id)}
          >
            <div className="font-medium text-white">{choice.text}</div>
            <div className="mt-1 text-xs text-white/50">{choice.hint}</div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="w-full rounded-full bg-sun px-4 py-3 text-sm font-semibold text-dusk transition hover:bg-white"
      onClick={onAdvance}
    >
      próxima cena
    </button>
  );
}
