import SceneLayers from './components/SceneLayers';
import ChoicePanel from './components/ChoicePanel';
import DialoguePanel from './components/DialoguePanel';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    gameState,
    currentScene,
    currentLine,
    activeChoices,
    isSceneComplete,
    isFinalScene,
    advanceDialogue,
    chooseOption,
    nextScene
  } = useGameState();

  return (
    <div className="app-shell min-h-screen bg-dusk text-fuyu overflow-hidden">
      <SceneLayers />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/70" />

      <div className="absolute left-6 bottom-6 right-6 pointer-events-none">
        <div className="backglass border border-white/10 rounded-3xl p-5 shadow-soft backdrop-blur-xl max-w-5xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="text-sm uppercase tracking-[0.3em] text-white/65">FUYU — lembrança de verão</div>
            <div className="text-3xl font-semibold leading-tight">uma cena contemplativa</div>
            <div className="text-sm text-white/70 max-w-2xl">
              Experiência atmosférica com parallax sutil, diálogo nostálgico e escolhas que moldam memórias.
            </div>
          </div>
        </div>
      </div>

      <main className="absolute inset-x-0 bottom-0 pb-8 px-6 md:px-12">
        <div className="dialogue-box pointer-events-auto max-w-5xl mx-auto rounded-[2rem] border border-white/15 bg-black/55 p-6 shadow-soft backdrop-blur-xl">
          {isFinalScene && isSceneComplete ? (
            <div className="space-y-4 text-white/90">
              <div className="text-xl font-semibold">Relatório da memória</div>
              <div>Amizade: {gameState.friendship}</div>
              <div>Escolhas: {gameState.choices.join(', ') || 'nenhuma'}</div>
              <div>Ovos de Páscoa: {gameState.easterEggsFound.join(', ') || 'nenhum'}</div>
              <div>Final: {gameState.ending || 'normal'}</div>
              <button
                type="button"
                className="mt-4 rounded-full bg-sun px-5 py-3 text-sm font-semibold text-dusk transition hover:bg-white"
                onClick={() => window.location.reload()}
              >
                Recomeçar
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-[1fr_320px]">
              <div>
                <DialoguePanel
                  location={currentScene.location}
                  speaker={currentLine?.speaker ?? '...' }
                  text={currentLine?.text ?? 'A cena começa a se mover devagar...'}
                  isSceneComplete={isSceneComplete}
                  onContinue={advanceDialogue}
                />
              </div>
              {isSceneComplete ? (
                <ChoicePanel
                  choices={activeChoices}
                  hasChoices={activeChoices.length > 0}
                  onChoose={chooseOption}
                  onAdvance={nextScene}
                />
              ) : (
                <div className="hidden md:block" />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
