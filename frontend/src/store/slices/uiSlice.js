import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  theme: localStorage.getItem('theme') || 'light',
  isSidebarOpen: true,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { setLoading, toggleTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
