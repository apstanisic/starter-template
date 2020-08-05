import { createSlice } from '@reduxjs/toolkit';

/**
 * UI Slice for controling look and feel
 */
export const uiSlice = createSlice({
  name: 'ui',
  initialState: { showSidebar: false, showLoader: false },
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    showLoader(state) {
      state.showLoader = true;
    },
    hideLoader(state) {
      state.showLoader = false;
    },
  },
});

export const { hideLoader, showLoader, toggleSidebar } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
