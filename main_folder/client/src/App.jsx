import { Canvas } from './components/Canvas';
import { Settings } from './components/Settings';
import { ToolsBar } from './components/ToolsBar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './styles/app.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/:id' element={<><ToolsBar /><Settings /><Canvas /></>} />
          <Route path='/' element={<><ToolsBar /><Settings /><Canvas /><Navigate to={`/f${(+new Date()).toString(16)}`} replace /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
