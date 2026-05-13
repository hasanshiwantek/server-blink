import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";

interface AdvanceState {
    loading: boolean;
    success: string | null;
    error: string | null;
    products: any,
    categories: any,
    brands: any,
    productCount: number,
    pagination: any
}

const initialState: AdvanceState = {
    loading: false,
    success: null,
    error: null,
    products: [],
    categories: [],
    brands: [],
    productCount: 0,
    pagination: null
};

interface SearchPayload {
    q: any;
    perPage?: number;
    page?: number;
    sortBy?: string;
}

// Search thunk
// export const advancedSearch = createAsyncThunk(
//     "advanceSearch/advancedSearch",
//     async ({ q, perPage = 20, page = 1 }: SearchPayload, thunkAPI) => {
//         try {
//             const res = await axiosInstance.get(
//                 `web/search?q=${encodeURIComponent(q)}&perPage=${perPage}&page=${page}`
//             );
//             return res.data;
//         } catch (err: any) {
//             return thunkAPI.rejectWithValue(
//                 err.response?.data?.message || "Search failed"
//             );
//         }
//     }
// );
export const advancedSearch = createAsyncThunk(
    "advanceSearch/advancedSearch",
    async ({ q, perPage = 12, page = 1, sortBy }: SearchPayload, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            params.append("q", q);
            params.append("perPage", perPage.toString());
            params.append("page", page.toString());
            if (sortBy) params.append("sortBy", sortBy);

            const res = await axiosInstance.get(`web/search?${params.toString()}`);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Search failed"
            );
        }
    }
);
const advanceSearchSlice = createSlice({
    name: "advanceSearch",
    initialState,
    reducers: {
        clearSearchData: (state) => {
            // state.searchData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Search
            .addCase(advancedSearch.pending, (state) => {
                state.loading = true;
                // state.searchData = null;
                state.error = null;
            })
            .addCase(advancedSearch.fulfilled, (state, action) => {
                const { data } = action.payload
                state.loading = false;
                state.products = data?.products?.items || [];
                state.categories = data?.categories?.items || [];
                state.brands = data?.brands?.items || [];
                state.productCount = data?.products?.count;
                state.pagination = data?.products?.pagination;
            })
            .addCase(advancedSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSearchData } = advanceSearchSlice.actions;
export default advanceSearchSlice.reducer;