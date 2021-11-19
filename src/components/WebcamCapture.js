import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../state/features/cameraSlice';
import { useNavigate } from 'react-router-dom';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

function WebcamCapture() {
  const navigate = useNavigate();
  const webcamRef = useRef();
  const dispatch = useDispatch();

  /* useCallback prevent uncessary rerenders
  it is simmilar to useEffect, it will save the output on the first run
  and if there is no changes in the dependecies (webcamRef in this case) 
  then will provide the saved output
  and will not "run" the function again */

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate('/preview');
  }, [webcamRef, dispatch, navigate]);
  return (
    <div className='webcamCapture'>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className='webcamCapture__button'
        onClick={capture}
        fontSize='large'
      />
    </div>
  );
}

export default WebcamCapture;
