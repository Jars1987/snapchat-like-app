import { Avatar } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import React from 'react';
import './Chat.css';
import ReactTimeago from 'react-timeago';
import { selectImage } from '../state/features/appSlice';
import { useDispatch } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router';

function Chat({ profilePic, username, timestamp, imageUrl, read, id }) {
  const date = new Date(timestamp?.toDate()).toUTCString();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));

      const docRef = doc(db, 'posts', id);
      setDoc(docRef, { read: true }, { merge: true });

      navigate('/chats/view');
    }
  };

  return (
    <div onClick={open} className='chat'>
      <Avatar className='chat__avatar' src={profilePic} />
      <div className='chat__info'>
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view -'} <ReactTimeago date={date} />
        </p>
      </div>

      {!read && <StopIcon className='chat__redIcon' />}
    </div>
  );
}

export default Chat;
