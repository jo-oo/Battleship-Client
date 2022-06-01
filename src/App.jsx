// Import css files
import socketio from 'socket.io-client';
import './App.css';
import LandingScreen from './pages/LandingScreen';
//import GameScreen from './pages/GameScreen';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);

function App() {
  return (
    <div className='App'>
      <LandingScreen socket={socket} />
    </div>
  );
}

export default App;
