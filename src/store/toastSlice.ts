import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastState = {
  open: boolean;
  message: string;
  type?: AlertColor;
};

const initialToastState: ToastState = {
  open: false,
  type: 'error',
  message: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialToastState,
  reducers: {
    showToast: (state: ToastState, action: PayloadAction<Omit<ToastState, 'open'>>) => {
      state.message = action.payload.message;
      if (state.type) state.type = action.payload.type;
      state.open = true;
    },
    hideToast: (state: ToastState) => {
      console.log('hideToast');
      state.open = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
