// store/slices/couponSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

interface Coupon {
  id: number;
  couponCode: string;
  discountType: "dollarAmountOrder" | "percentOrder";
  discountAmount: string;
  enabled: string;
  // add other fields as needed
}

interface CouponState {
  appliedCoupon: Coupon | null;
  discountAmount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  appliedCoupon: null,
  discountAmount: 0,
  loading: false,
  error: null,
};

// Async thunk to apply coupon
export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async (
    { couponCode, total }: { couponCode: string; total: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/web/coupons/get-couponcode", {
        params: { couponCode },
      });

      const coupon = response?.data?.data;

      if (!coupon || coupon.enabled !== "1") {
        return rejectWithValue("Invalid or expired promo code");
      }

      let discountAmount = 0;

      if (coupon.discountType === "dollarAmountOrder") {
        discountAmount = Number(coupon.discountAmount);
      } else if (coupon.discountType === "percentOrder") {
        discountAmount = (total * Number(coupon.discountAmount)) / 100;
      }

      return { coupon, discountAmount };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon"
      );
    }
  }
);

export const fetchLoadSavedQuote = createAsyncThunk(
  "cart/fetchLoadSavedQuote",
  async (quoteToken: string, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`web/cart/load-saved-quote`, {
        quoteToken,
      });
      return res?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load saved quote"
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountAmount = 0;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedCoupon = action.payload.coupon;
        state.discountAmount = action.payload.discountAmount;
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(fetchLoadSavedQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoadSavedQuote.fulfilled, (state, action) => {
        if (action?.payload?.data?.couponCode && Number(action?.payload?.data?.discountAmount)) {
          state.loading = false;
          state.appliedCoupon = action?.payload?.data?.couponCode;
          state.discountAmount = Number(action?.payload?.data?.discountAmount); 
          state.error = null;
        }
      })
      .addCase(fetchLoadSavedQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeCoupon, clearError } = couponSlice.actions;
export default couponSlice.reducer;