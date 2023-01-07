import { Canvas } from './components/Canvas';
import { Settings } from './components/Settings';
import { ToolsBar } from './components/ToolsBar';
import './styles/app.scss';

function App() {
  return (
    <div className="app">
      <ToolsBar />
      <Settings />
      <Canvas />
    </div>
  );
}

export default App;
