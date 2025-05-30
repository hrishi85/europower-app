import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunks';


const initialState = {
    user: null,
    authToken: null,
    loading: false,
    error: null
};

// Define what a user object looks like
type User = {
    user_ID: number;
    firstName?: string;
    phone?: string;
    userName: string;
    password: string | null;
    isDelete?: boolean;
    isDeleteAccess?: number;
    role: string;
    refKeyId?: number;
    uType?: number;
    desgId?: number;
    desgAccessLevel?: string | null;
    desgName?: string | null;
    desgLevel?: number;
};

// Define the shape of the slice state
export type AuthState = {
    user: User | null;
    authToken: string | null;
    loading: boolean;
    error: string | null;
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.authToken = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state:AuthState, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authToken = action.payload.authToken;
            })
            .addCase(loginUser.rejected, (state:AuthState, action:any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
