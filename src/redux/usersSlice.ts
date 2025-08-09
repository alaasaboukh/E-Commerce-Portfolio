import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    data: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    loading: boolean;
    error: string | null;
    successMessage: string | null;
}

interface UserInput {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const initialState: UserState = {
    data: {
        name: "",
        email: "",
        phone: "",
        address: "",
    },
    loading: false,
    error: null,
    successMessage: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserProfile = createAsyncThunk(
    "user/fetchProfile",
    async (userId: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`${BASE_URL}/api/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "فشل تحميل البيانات";
                return rejectWithValue(message);
            }
            return rejectWithValue("Unexpected error occurred");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (
        { userId, formData }: { userId: string; formData: UserInput },
        { rejectWithValue }
    ) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `${BASE_URL}/api/users/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.response?.data?.message || "حدث خطأ أثناء التحديث";
                return rejectWithValue(message);
            }
            return rejectWithValue("Unexpected error occurred");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch data";
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Data saved successfully";
                state.data = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "An error occurred during update";
            });
    },
});

export const { clearStatus } = userSlice.actions;
export default userSlice.reducer;
