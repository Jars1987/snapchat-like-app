import React, { useEffect } from 'react';
import './Preview.css';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { resetCameraImage, selectcamara } from '../state/features/cameraSlice';
import { selectUser } from '../state/features/appSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';

function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cameraImage = useSelector(selectcamara);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) navigate('/', { replace: true });
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = async () => {
    // I used uuid package to generate Ids
    const id = uuid();
    const storageRef = ref(storage, `posts/${id}`);

    // I await the uploadTast to finish
    const uploadTask = await uploadString(storageRef, cameraImage, 'data_url');

    //than get the url
    const url = await getDownloadURL(uploadTask.ref);

    //finally add the document to the DB
    await setDoc(
      doc(db, 'posts', id),
      {
        imageUrl: url,
        username: user.username,
        read: false,
        profilePic: user.profilePic,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );

    navigate('/chats');
  };

  return (
    <div className='preview'>
      <CloseIcon onClick={closePreview} className='preview__close' />
      <div className='preview__toolbarRight'>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt='' />
      <div className='preview__footer' onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon fontSize='small' className='preview__sendIcon' />
      </div>
    </div>
  );
}

export default Preview;
