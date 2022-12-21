import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: null,
    token: null,
    basket: [],
    addressBilling: null,
    addressDelivery: null,
    paymentType: null,
  },
};

// user: { type: mongoose.Schema.Types.ObjectId, ref:'users'},
// orderNumber: String,
// purchaseDate: Date,
// orderItems:{ type: [Items.Schema], required: true },
// orderStatus: { type: [statusSchema], required: true },
// isCanceled: Boolean,
// cancelDate: Date,
// addressBilling:{ type: addressSchema, required: true } ,
// addressDelivery:{ type: addressSchema, required: true },   /*[id, street, zipCode, city, state, country, phoneNumber, isForBilling, isForDelivery, isDefault, isDeleted,]*/
// paymentType: { type: paymentTypeSchema, required: true } , /*[payment]*/
// isPaid: Boolean,
// paidDate: Date,

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      state.value.basket = action.payload;
    },
    addAdress: (state, action) => {
      state.value.addressDelivery = action.payload;
      state.value.addressBilling = action.payload;
    },
    addToken: (state, action) => {
      state.value.token = action.payload.token;
    },
    addpayment: (state, action) => {
      state.value.paymentType = action.payload;
    },
  },
});

export const { login, logout, addItem, addBasketItem, removeBasketItem } =
  orderSlice.actions;
export default orderSlice.reducer;
