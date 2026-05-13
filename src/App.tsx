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

      {/* Camada para escurecer sutilmente as bordas */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/70" />

      {/* 
        A caixa de diálogo e textos foram temporariamente escondidos
        conforme solicitado para testar apenas o background.
      */}
    </div>
  );
}

export default App;
