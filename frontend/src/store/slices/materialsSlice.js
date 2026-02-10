import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { materialsApi } from '../../services/api';

export const fetchMaterials = createAsyncThunk('materials/fetchAll', async () => {
  const response = await materialsApi.getAll();
  return response.data;
});

const materialsSlice = createSlice({
  name: 'materials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default materialsSlice.reducer;
