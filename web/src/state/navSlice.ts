import { createSlice } from '@reduxjs/toolkit';

/**
 * Nav slice, used just for easy access to nav globaly
 * It's easier than to make it into context
 */
const navSlice = createSlice({
  name: 'nav',
  initialState: {
    links: [{ path: '/', name: 'Pocetna' }],
  },
  reducers: {},
});

export const navReducer = navSlice.reducer;
