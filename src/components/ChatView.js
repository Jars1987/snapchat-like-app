import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { selectSelectedImage } from '../state/features/appSlice';
import './ChatView.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function ChatsView() {
  const selectImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectImage) {
      exit();
    }
  }, [selectImage]);

  const exit = () => {
    navigate('/chats', { replace: true });
  };

  return (
    <div className='chatView'>
      <img src={selectImage} alt='' onClick={exit} />
      <div className='chatView__timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}>
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatsView;
