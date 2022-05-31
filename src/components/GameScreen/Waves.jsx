//takes in opponent, oppShiftLeft etc from GameScreen
import Wave from 'react-wavify';

const Waves = () => {
  return (
    <>
      <div className='position-absolute waves-container'>
        <div className='wave-1'>
          <Wave
            fill='#8ABDCD'
            paused={false}
            options={{
              height: 0.1,
              amplitude: 200,
              speed: 0.2,
              points: 6,
            }}
          />
        </div>

        <div>
          <Wave
            fill='#6194A5'
            paused={false}
            options={{
              height: 10,
              amplitude: 180,
              speed: 0.1,
              points: 8,
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: '1' }}>
          <Wave
            fill='#8ABDCD'
            paused={false}
            options={{
              height: 8,
              amplitude: 60,
              speed: 0.08,
              points: 6,
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: '2' }}>
          <Wave
            fill='#6194A5'
            paused={false}
            options={{
              height: 5,
              amplitude: 100,
              speed: 0.15,
              points: 4,
            }}
          />
        </div>
      </div>
      ;
    </>
  );
};

export default Waves;
