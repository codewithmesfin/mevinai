import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER } from '../../types/user';
import api from '../../lib/api';
import { setToken, removeToken, isAuthenticated } from '../../lib/auth';

interface UserState {
    user: USER | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    userSites: any[] | null;
    emailExists: boolean; // State to track email existence
    domainExists: boolean; // State to track domain existence
    emailVerified: boolean; // State to track email verification status
    passwordReset: boolean; // State to track password reset status
}

const initialState: UserState = {
    user: null,
    isAuthenticated: isAuthenticated(),
    status: 'idle',
    error: null,
    userSites: null,
    emailExists: false, // Initialize with false
    domainExists: false, // Initialize with false
    emailVerified: false, // Initialize with false
    passwordReset: false, // Initialize with false
};

// Async actions

export const register = createAsyncThunk(
    'user/register',
    async (userData: Omit<USER, '_id' | 'sites'>, { rejectWithValue }) => {
        try {
            const data = await api.registerUser(userData, '/signup');
            setToken(data.data.token);

            return data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.loginUser({ email, password }, '/signin');
            setToken(response.data.token); // Save the token if login is successful
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);


export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            // Remove the token
            removeToken();
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);



// Fetch user sites based on ownerId
export const getUserSites = createAsyncThunk(
    'user/getUserSites',
    async (ownerId: string, { rejectWithValue }) => {
        try {
            const response = await api.getItem(`/user/${ownerId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user sites');
        }
    }
);

// Check if email already exists
export const checkEmailExistence = createAsyncThunk(
    'user/checkEmailExistence',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await api.create({ email }, '/email-exists');
            return response.data; // Assuming the response returns a boolean `exists`
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error checking email existence');
        }
    }
);

// Check if domain already exists
export const checkDomainNameExistance = createAsyncThunk(
    'user/checkDomainNameExistance',
    async (domainName: string, { rejectWithValue }) => {
        try {
            const response = await api.create({ siteName: domainName }, "/check-sitename");
            return response.data; // Assuming the response returns a boolean `exists`
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Error checking domain existence');
        }
    }
);

// Verify email
export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await api.create({ email}, '/reset-password-request');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Email verification failed');
        }
    }
);

// Reset password
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ password, token }: { password: string, token: string }, { rejectWithValue }) => {
        try {
            const response = await api.create({ password }, `/reset-password/${token}`);
            setToken(response.data.token); // Save the token if login is successful
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
        }
    }
);

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(getUserSites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserSites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userSites = action.payload;
            })
            .addCase(getUserSites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Add case for checking email existence
            .addCase(checkEmailExistence.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkEmailExistence.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.emailExists = action.payload; // Set the email existence status
            })
            .addCase(checkEmailExistence.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(checkDomainNameExistance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkDomainNameExistance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.domainExists = action.payload; // Set the domain existence status
            })
            .addCase(checkDomainNameExistance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null; // Clear user data
                state.isAuthenticated = false; // Reset authentication status
                state.userSites = null; // Clear user-specific sites
                state.emailExists = false; // Reset email existence state
                state.domainExists = false; // Reset domain existence state
                state.error = null; // Clear any existing errors
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })

            .addCase(verifyEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.status = 'succeeded';
                state.emailVerified = true; // Mark email as verified
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.status = 'succeeded';
                state.passwordReset = true; // Mark password as reset
                state.isAuthenticated = true;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
