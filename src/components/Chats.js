import React, { useEffect, useState } from 'react';
import './Chats.css';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { db, auth } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectUser } from '../state/features/appSlice';
import { useNavigate } from 'react-router';
import { resetCameraImage } from '../state/features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    //carefull with the naming of your data on DB
    //you were tring to oreder by timeStamp but you have
    //named it timestamp (all lower case)

    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.docs.forEach(doc => {
      data.push({ id: doc.id, data: doc.data() });
    });

    setPosts([...data]);
  };

  const logoutUser = () => {
    auth.signOut();
    dispatch(logOut());
  };

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate('/');
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar
          src={user.profilePic}
          onClick={logoutUser}
          className='chats__avatar'
        />
        <div className='chats__search'>
          <SearchIcon className='chats__searchIcon' />
          <input placeholder='Friends' type='text' />
        </div>
        <ChatBubbleIcon className='chats__chatIcon' />
      </div>
      <div className='chats__posts'>
        {posts &&
          posts.map(
            ({
              id,
              data: { profilePic, username, timestamp, imageUrl, read },
            }) => (
              <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
              />
            )
          )}
      </div>
      <RadioButtonUncheckedIcon
        className='chats__takePicIcon'
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
}

export default Chats;
