import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser } from '../../utils/api'; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await apiLoginUser(loginData);
      const { access, refresh , user} = response.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);
      return {access, refresh , user};
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, status: 'idle', error: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      console.log(user, accessToken,'HEE');
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    },
    rehydrateState: (state) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
          state.token = accessToken;
        }
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload,'PAYLOAD')
        // const {access , user} = action.payload;
        // const updateUser = {
        //   first_name: 'Anil',
        //   last_name: 'Antony',
        //   profile_pic: '/media/user/profile_pic/Untitled_1_9penxAP.png'
        // }
        state.token = action.payload.access;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCredentials, logOut, rehydrateState} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
