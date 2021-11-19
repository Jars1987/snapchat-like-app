import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

export const signInUser = createAsyncThunk('user/signin', async () => {
  const { user } = await signInWithPopup(auth, provider);
  const newUser = {
    username: user.displayName,
    profilePic: user.photoURL,
    id: user.uid,
  };
  return newUser;
});

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    selectedImage: '',
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: state => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    resetSelectImage: state => {
      state.selectedImage = null;
    },
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, selectImage, resetSelectImage } =
  appSlice.actions;

// Select the state you want to keep track of
export const selectUser = state => state.app.user;

export const selectSelectedImage = state => state.app.selectedImage;

//Export the mailSlice as a reducer:
export default appSlice.reducer;
