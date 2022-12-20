import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    gallery: [],
  },
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.value.gallery.push(action.payload);
    },
  },
});

export const { addFavorite } = gallerySlice.actions;
export default gallerySlice.reducer;
