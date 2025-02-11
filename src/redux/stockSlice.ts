// src/redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  products: Product[];
  orderBy: "asc" | "desc";
}

const initialState: StockState = {
    products: [],
    orderBy: "asc"
};

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
      addProduct(state, action: PayloadAction<Product>) {
        state.products.push(action.payload);
      },
      increaseItem(state, action: PayloadAction<{ productId: number; quantity: number }>) {
        const product = state.products.find((p) => p.id === action.payload.productId);
        if (product) {
          product.quantity += action.payload.quantity; // Increase stock
        }
      },
      decreaseItem(state, action: PayloadAction<{ productId: number; quantity: number }>) {
        const product = state.products.find((p) => p.id === action.payload.productId);
        if (product && product.quantity >= action.payload.quantity) {
          product.quantity -= action.payload.quantity; // Decrease stock
        }
      },
      setOrderBy(state, action: PayloadAction<"asc" | "desc">) {
        state.orderBy = action.payload;
        state.products.sort((a, b) =>
          state.orderBy === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
      },
    },
});

export const { addProduct, increaseItem, decreaseItem, setOrderBy } = stockSlice.actions;
export default stockSlice.reducer;
