import { describe, it, expect } from 'vitest';
import materialsReducer from '../store/slices/materialsSlice';

describe('materialsSlice reducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(materialsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchMaterials.pending', () => {
    const action = { type: 'materials/fetchAll/pending' };
    const state = materialsReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle fetchMaterials.fulfilled', () => {
    const items = [{ id: 1, name: 'Wood', stockQuantity: 100 }];
    const action = { type: 'materials/fetchAll/fulfilled', payload: items };
    const state = materialsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(items);
  });
});
