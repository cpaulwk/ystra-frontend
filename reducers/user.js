import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    userName: null,
    token: null,
    basket: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.userName = action.payload.userName;
      state.value.token = action.payload.token;
    },
    logout: (state, action) => {
      state.value.userName = null;
      state.value.token = null;
      state.value.basket = [];
    },
    addItem: (state, action) => {
      state.value.basket.push(action.payload);
    },
    removeItem: (state, action) => {
      state.value.basket = state.value.basket.filter(
        (elem) => elem !== action.payload
      );
    },
  },
});

export const { login, logout, addItem, removeItem } = userSlice.actions;
export default userSlice.reducer;

