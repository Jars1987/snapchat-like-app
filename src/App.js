import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './components/Preview';
import Chats from './components/Chats';
import ChatView from './components/ChatView';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut, selectUser } from './state/features/appSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          logIn({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  }, []);

  return (
    <div className='app'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className='app__logo'
              src='https://t.ctcdn.com.br/SmuvOS5JjmO6pMXWoUE5sLjUhP0=/512x288/smart/i12720.png'
              alt='snapchat logo'
            />
            <div className='app__body'>
              <div className='app__bodyBackground'>
                <Routes>
                  <Route path='/' element={<WebcamCapture />} />
                  <Route path='preview' element={<Preview />} />
                  <Route path='chats' element={<Chats />} />
                  <Route path='chats/view' element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
