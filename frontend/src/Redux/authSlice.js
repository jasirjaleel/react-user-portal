// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../api';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

// // Async thunk for login
// export const login = createAsyncThunk(
//   'auth/login',
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('/login/', { username, password });
//       localStorage.setItem(ACCESS_TOKEN, response.data.access);
//       localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk for registration
// export const register = createAsyncThunk(
//   'auth/register',
//   async ({ username, password, email, phone }, { rejectWithValue }) => {
//     try {
//       const response = await api.post('api/user/register/', { username, password, email, phone });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     error: null,
//     loading: false,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem(ACCESS_TOKEN);
//       localStorage.removeItem(REFRESH_TOKEN);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
