import SceneLayers from './components/SceneLayers';
import GameUI from './components/GameUI';

function App() {
  return (
    <div className="app-shell" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <SceneLayers />

      {/* Camada para escurecer sutilmente as bordas */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/70" />

      {/* Interface do jogo: personagens, dialbox, setas, ícones */}
      <GameUI />
    </div>
  );
}

export default App;

