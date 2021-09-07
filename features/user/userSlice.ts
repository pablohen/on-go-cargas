import { createSlice } from '@reduxjs/toolkit';
import onGoCargasService from '../../services/onGoCargasService';

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
      onGoCargasService.api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${state.accessToken}`;
      onGoCargasService.api.defaults.headers.common[
        'Ocp-Apim-Subscription-Key'
      ] = process.env.NEXT_PUBLIC_SUBSCRIPTION_KEY;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
