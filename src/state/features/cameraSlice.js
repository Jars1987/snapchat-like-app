import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: { cameraImage: null },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: state => {
      state.cameraImage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

// Select the state you want to keep track of
export const selectcamara = state => state.camera.cameraImage;

//Export the mailSlice as a reducer:
export default cameraSlice.reducer;
