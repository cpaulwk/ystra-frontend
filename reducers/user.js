import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    token: null,
    basket: [],
    newItem: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    logout: (state, action) => {
      state.value.email = null;
      state.value.token = null;
      state.value.basket = [];
    },
    addItem: (state, action) => {
      state.value.newItem = action.payload;
    },
    addBasketItem: (state, action) => {
      state.value.basket.push(action.payload);
    },
    removeBasketItem: (state, action) => {
      // state.value.basket = state.value.basket.filter(
      //   (elem) => elem !== action.payload
      // );
      state.value.basket.splice(action.payload, 1);
    },
    cleanBasket: (state, action) => {
      state.value.basket = [];
    },
  },
});

export const {
  login,
  logout,
  addItem,
  addBasketItem,
  removeBasketItem,
  cleanBasket,
} = userSlice.actions;
export default userSlice.reducer;
