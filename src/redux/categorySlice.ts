import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryType {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryState {
    category: CategoryType[];
}

const initialState: CategoryState = {
    category: [],
};

export const getCategory = createAsyncThunk(
    "Categories/GetAllCategories",
    async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            return res.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error("not found");
            } else {
                throw new Error("server error");
            }
        }
    }
);

export const addCategory = createAsyncThunk(
    "Categories/createCategories",
    async (
        { token, name, description }: { token: string; name: string; description: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data.data;
        } catch (error: unknown) {
            let message = "category creation failed";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message ?? message;
            }
            return rejectWithValue(message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async ({ token, id }: { token: string; id: string }) => {
        try {
            await fetch(`http://localhost:8008/api/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch {
            throw new Error("not server");
        }
    }
);

export const updateCategories = createAsyncThunk(
    "categories/updateCategories",
    async (
        {
            token,
            id,
            name,
            description
        }: {
            token: string;
            id: string;
            name: string;
            description: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
                { name, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            return res.data.data;
        } catch (error: unknown) {
            let message = "update category failed";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message ?? message;
            }
            return rejectWithValue(message);
        }
    }
);

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(
                getCategory.fulfilled,
                (state, action: PayloadAction<CategoryType[]>) => {
                    state.category = action.payload;
                }
            )
            .addCase(
                addCategory.fulfilled,
                (state, action: PayloadAction<CategoryType>) => {
                    state.category.push(action.payload);
                }
            )
            .addCase(
                deleteCategory.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.category = state.category.filter(
                        (category) => category._id !== action.payload
                    );
                }
            )
            .addCase(
                updateCategories.fulfilled,
                (state, action: PayloadAction<CategoryType>) => {
                    const exist = state.category.find((f) => f._id === action.payload._id);
                    if (exist) {
                        exist.name = action.payload.name;
                    }
                }
            );
    },
});

export default categorySlice.reducer;
