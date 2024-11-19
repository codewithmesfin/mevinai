import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { SITE } from '@/types/user';

interface SaasState {
    apps: string[];
    userApps: string[];
    site: SITE | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: SaasState = {
    apps: [],
    userApps: [],
    site: null,
    status: 'idle',
    error: null,
};

// Async actions

// Get all available apps
export const getApps = createAsyncThunk(
    'saas/getApps',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getItem('/frappe-apps');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch apps');
        }
    }
);

// Get user-specific apps
export const getUserApps = createAsyncThunk(
    'saas/getUserApps',
    async (siteName: string, { rejectWithValue }) => {
        try {
            const response = await api.getItem(`/installed-apps?siteName=${siteName}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user apps');
        }
    }
);

// Create a new site
export const createSite = createAsyncThunk(
    'saas/createSite',
    async (siteData: { domain: string; ownerId: string }, { rejectWithValue }) => {
        try {
            const response = await api.create(siteData, '/create-site');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create site');
        }
    }
);

// Install an app on a site
export const installApp = createAsyncThunk(
    'saas/installApp',
    async (appData: { siteId: string; appName: string }, { rejectWithValue }) => {
        try {
            const response = await api.create(appData, '/install-app');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to install app');
        }
    }
);

// Uninstall an app from a site
export const uninstallApp = createAsyncThunk(
    'saas/uninstallApp',
    async (appData: { siteId: string; appName: string }, { rejectWithValue }) => {
        try {
            const response = await api.create(appData, '/uninstall-app');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to uninstall app');
        }
    }
);

// Install SSL on a site
export const installSSL = createAsyncThunk(
    'saas/installSSL',
    async (siteId: string, { rejectWithValue }) => {
        try {
            const response = await api.create({ siteId }, '/install-ssl');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to install SSL');
        }
    }
);

// Configure Nginx for a site
export const configureNginx = createAsyncThunk(
    'saas/configureNginx',
    async (siteId: string, { rejectWithValue }) => {
        try {
            const response = await api.create({ siteId }, '/configure-nginx');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to configure Nginx');
        }
    }
);

// Saas slice
const saasSlice = createSlice({
    name: 'saas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getApps
            .addCase(getApps.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getApps.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.apps = action.payload;
            })
            .addCase(getApps.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // getUserApps
            .addCase(getUserApps.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserApps.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userApps = action.payload;
            })
            .addCase(getUserApps.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // createSite
            .addCase(createSite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createSite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.site = action.payload;
            })
            .addCase(createSite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // installApp
            .addCase(installApp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(installApp.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(installApp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // uninstallApp
            .addCase(uninstallApp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uninstallApp.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(uninstallApp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // installSSL
            .addCase(installSSL.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(installSSL.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(installSSL.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // configureNginx
            .addCase(configureNginx.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(configureNginx.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(configureNginx.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export default saasSlice.reducer;
