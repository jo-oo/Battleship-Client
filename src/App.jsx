// Import css files
import socketio from 'socket.io-client'
import './App.css'
import LandingScreen from './pages/LandingScreen'
//import GameScreen from './pages/GameScreen';

const socket = socketio.connect('http://localhost:4000/')

function App() {

  return (
    <div className="App">

      <LandingScreen />

    </div>
  );
}

export default App;
