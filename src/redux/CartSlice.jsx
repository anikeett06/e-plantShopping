
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === product.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const target = action.payload;
      const targetName =
        typeof target === "object" ? target.name : target;

      state.items = state.items.filter(
        (item) => item.name !== targetName && item.id !== target
      );
    },

    updateQuantity: (state, action) => {
      const { id, name, quantity } = action.payload;

      const item = state.items.find(
        (product) =>
          (id !== undefined && product.id === id) ||
          (name !== undefined && product.name === name)
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (product) => product !== item
        );
      } else {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
