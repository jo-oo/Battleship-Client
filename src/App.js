// Import css files
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import LandingScreen from './pages/LandingScreen'
import GameScreen from './pages/GameScreen';

function App() {
  return (
    <div className="App">
      
      <LandingScreen />

      <GameScreen />

    </div>
  );
}

export default App;
