import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loadng = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  loginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
