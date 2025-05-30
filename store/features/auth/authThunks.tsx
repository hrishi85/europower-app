import api, { setAuthToken } from '@/services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

type LoginResponse = {
    user: User;
    authToken: string;
};

type LoginInput = {
    userName: string;
    password: string;
};

export const loginUser = createAsyncThunk<LoginResponse, LoginInput>(
    'auth/loginUser',
    async ({ userName, password }, thunkAPI) => {
        try {
            const response = await api.post('/Auth/UserLogin', {
                userName,
                password,
            });

            const { authToken, user } = response.data.data;

            setAuthToken(authToken);

            return { authToken, user };
        } catch (error: any) {
            console.error("Login failed:", error?.message || error);

            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || 'Login failed. Please check your credentials or try again later.'
            );
        }
    }
);
