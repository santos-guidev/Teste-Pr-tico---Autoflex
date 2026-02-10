import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import materialsReducer from './slices/materialsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    materials: materialsReducer,
  },
});
