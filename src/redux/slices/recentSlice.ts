import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
}

export interface Product {
  id: number;
  brand: Brand | string;
  sku: string;
  name: string | { name?: string };
  price: number | string;
  msrp?: number;
  image?: { path?: string }[];
  slug: string;
}


interface RecentState {
  items: Product[];
}

const initialState: RecentState = {
  items: [],
};

const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addRecentView: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      // duplicate remove (SKU based)
      state.items = state.items.filter(
        (p) => p.sku !== product.sku
      );

      // top pe add
      state.items.unshift(product);

      // limit 20
      if (state.items.length > 20) {
        state.items.pop();
      }
    },
    clearRecent: (state) => {
      state.items = [];
    },
  },
});

export const { addRecentView, clearRecent } = recentSlice.actions;
export default recentSlice.reducer;
