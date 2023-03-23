import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: null,
    token: null,
    basket: [],
    addressBilling: null,
    addressDelivery: null,
    paymentType: null,
    totalPrice: 0,
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
      console.log(state.value.basket);
    },
    addTotal: (state, action) => {
      state.value.totalPrice = action.payload;
    },
    addAddress: (state, action) => {
      state.value.addressDelivery = action.payload;
      state.value.addressBilling = action.payload;
    },
    clearAddress: (state) => {
      state.value.addressDelivery = null;
      state.value.addressBilling = null;
    },
    addToken: (state, action) => {
      state.value.token = action.payload;
      console.log("token", state.value.token);
    },
    addpayment: (state, action) => {
      state.value.paymentType = action.payload;
    },
    removeOrder: (state, action) => {
      state.value.user = null;
      state.value.token = null;
      state.value.basket = [];
      state.value.addressBilling = null;
      state.value.addressDelivery = null;
      state.value.paymentType = null;
    },
  },
});

export const {
  addBasket,
  addAddress,
  clearAddress,
  addToken,
  addpayment,
  removeOrder,
  addTotal,
} = orderSlice.actions;
export default orderSlice.reducer;
