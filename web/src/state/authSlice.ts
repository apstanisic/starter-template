import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from 'src/core/auth/auth';
import { User } from 'src/modules/auth/user-interface';

interface LoginParams {
  email: string;
  password: string;
}
interface RegisterParams extends LoginParams {
  name: string;
}

/** Logout user */
export const logout = createAsyncThunk('auth/login', async (args, { dispatch }) => {
  await auth.logout();
  dispatch(logoutSuccess());
});

/** Attempt login */
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginParams, { dispatch }) => {
    const user = await auth.login(email, password);
    dispatch(loginSuccess(user));
    return user;
  },
);

/** Get login from storage when booting application */
export const initLogin = createAsyncThunk('auth/initLogin', async (args, { dispatch }) => {
  const data = await auth.getData();
  if (data?.user !== undefined) {
    dispatch(loginSuccess(data.user));
  } else {
    // Set is logged in to false if not logged in
    dispatch(logoutSuccess());
  }
});

/* Register new user and store him in the state */
export const register = createAsyncThunk('auth/register', async (args: RegisterParams) => {
  const user = await auth.register(args.email, args.password, { name: args.name });
  return user;
});

/* Change user informations */
export const changeUserInfo = createAsyncThunk(
  'auth/changeUserInfo',
  async (user: Partial<User>) => {
    const updatedUser = await auth.manageUser.changeUserInfo(user);
    return updatedUser;
  },
);

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (password: string, { dispatch }) => {
    await auth.manageUser.deleteUser(password);
    dispatch(logout());
    return true;
  },
);

/**
 * Auth slice
 */
export const authSlice = createSlice({
  name: 'auth',
  // loggedIn is undefined in begining until auth is initialized
  initialState: { loggedIn: undefined as boolean | undefined, user: undefined as User | undefined },
  reducers: {
    logoutSuccess(state) {
      state.loggedIn = false;
      state.user = undefined;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loggedIn = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    /** Register */
    builder.addCase(register.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    });
    /** Change user info */
    builder.addCase(changeUserInfo.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    });
  },
});

const { loginSuccess, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
