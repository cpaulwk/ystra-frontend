import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: null,
    token: null,
    basket: [],
    newItem: {},
    changeItem: null,
    previousScreen: null,
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
    changeItem: (state, action) => {
      console.log("itemToChange action.payload => ", action.payload);
      state.value.changeItem = action.payload;
    },
    cancelChangeItem: (state, action) => {
      state.value.changeItem = null;
    },
    updateChangedItem: (state, action) => {
      const elementToFind = state.value.basket.find(
        (item) => item.imageResult_id === action.payload.imageResult_id
      );
      const index = state.value.basket.indexOf(elementToFind);
      const newItem = action.payload;
      state.value.basket.splice(index, 1, newItem);
      state.value.changeItem = null;
      console.log("state.value.changeItem => ", state.value.changeItem);
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
    changeItemQuantity: (state, action) => {
      let result = state.value.basket.findIndex(
        (e) => e.imageResult_id === action.payload.imageResult_id
      );
      if (result > -1) {
        state.value.basket[result].quantity = action.payload.quantity;
      }
    },
    previousScreen: (state, action) => {
      state.value.previousScreen = action.payload;
    },
    cleanPreviousScreen: (state, action) => {
      state.value.previousScreen = null;
    },
  },
});

export const {
  login,
  logout,
  addItem,
  addBasketItem,
  changeItem,
  cancelChangeItem,
  updateChangedItem,
  removeBasketItem,
  cleanBasket,
  changeItemQuantity,
  previousScreen,
  cleanPreviousScreen,
} = userSlice.actions;
export default userSlice.reducer;
