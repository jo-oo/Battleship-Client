//takes in opponent, oppShiftLeft etc from GameScreen
import Wave from 'react-wavify';

const Waves = () => {
  return (
    <>
      <div className='position-absolute waves-container'>
        <div className='waves'>
          <div className='wave-1'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 200,
                speed: 0.2,
                points: 6,
              }}
            />
          </div>

          <div className='wave-2'>
            <Wave
              fill='#8A1E1E'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 180,
                speed: 0.1,
                points: 8,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 10,
                amplitude: 100,
                speed: 0.08,
                points: 6,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#BC0303'
              paused={false}
              options={{
                height: 0.4,
                amplitude: 100,
                speed: 0.15,
                points: 4,
              }}
            />
          </div>
          <div className='wave-1'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 200,
                speed: 0.2,
                points: 6,
              }}
            />
          </div>

          <div className='wave-2'>
            <Wave
              fill='#8A1E1E'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 180,
                speed: 0.07,
                points: 8,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 10,
                amplitude: 100,
                speed: 0.08,
                points: 6,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#BC0303'
              paused={false}
              options={{
                height: 0.4,
                amplitude: 100,
                speed: 0.18,
                points: 4,
              }}
            />
          </div>
          <div className='wave-1'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 200,
                speed: 0.25,
                points: 6,
              }}
            />
          </div>

          <div className='wave-2'>
            <Wave
              fill='#8A1E1E'
              paused={false}
              options={{
                height: 0.1,
                amplitude: 180,
                speed: 0.09,
                points: 8,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#D41D1D'
              paused={false}
              options={{
                height: 0.8,
                amplitude: 100,
                speed: 0.1,
                points: 6,
              }}
            />
          </div>

          <div className='wave-3'>
            <Wave
              fill='#BC0303'
              paused={false}
              options={{
                height: 0.4,
                amplitude: 100,
                speed: 0.15,
                points: 4,
              }}
            />
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Waves;
