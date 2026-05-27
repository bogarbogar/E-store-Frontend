import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { HttpAPI } from "../utils/api";

const API = "http://localhost:5000/api/products";

export interface Product {
  _id?: string;
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
}

// Async thunks
// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await HttpAPI.axios().get(API);
//       return res.data.data;
//     } catch (err: any) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const response = await HttpAPI.axios().get(API);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const createProduct = createAsyncThunk(
//     "products/create",
//     async (product: any, { rejectWithValue }) => {
//         try {
//             const res = await axios().post(API, product);
//             return res.data.data;
//         } catch (err: any) {
//             return rejectWithValue(err.message);
//         }
//     }
// );

export const createProduct = createAsyncThunk(
  "products/create",
  async (
    payload: any,
    { rejectWithValue }
  ) => {

    try {
      const response = await HttpAPI.axios().post(API, payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }: { id: string; data: Partial<Product> }, { rejectWithValue }) => {
    try {
      const res = await HttpAPI.axios().put(`${API}/${id}`, data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await HttpAPI.axios().delete(`${API}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;

function axios() {
  throw new Error("Function not implemented.");
}

