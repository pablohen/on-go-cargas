import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  expiresIn: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload['access_token'];
      state.expiresIn = action.payload['expires_in'];
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresIn = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
