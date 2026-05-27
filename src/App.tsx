import { useState } from 'react';
import SceneLayers from './components/SceneLayers';
import GameUI from './components/GameUI';
import EnvelopeIntro from './components/EnvelopeIntro';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="app-shell" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Tela inicial da carta — some após animação */}
      <EnvelopeIntro onFinish={() => setIntroFinished(true)} />

      {/* Site principal */}
      <SceneLayers />

      {/* Camada para escurecer sutilmente as bordas */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/70" />

      {/* Interface do jogo: personagens, dialbox, setas, ícones */}
      <GameUI />
    </div>
  );
}

export default App;
