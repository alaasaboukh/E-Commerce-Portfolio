import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProductsType } from "@/lib/types";
import axios from "axios";

export interface ProductInput {
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    stock: number;
    categoryId: string;
    images: string[];
}

interface ProductItem {
    Items: ProductsType[];
    loading: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductItem = {
    Items: [],
    loading: "idle",
    error: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const GetProducts = createAsyncThunk<
    ProductsType[],
    void,
    { rejectValue: string }
>("products/GetProducts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/products`, {
            params: { page: 1, limit: 32 },
        });
        return res.data.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data?.message || "Server Error");
        }
        return rejectWithValue("Unexpected Error");
    }
});

export const addProductImage = createAsyncThunk<
    string[],
    { token: string; formData: FormData },
    { rejectValue: string }
>(
    "products/addProductsImage",
    async ({ token, formData }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${BASE_URL}/api/products/upload-images`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return res.data.data.imageUrls;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Image upload failed"
                );
            }
            return rejectWithValue("Unexpected Error");
        }
    }
);

export const createProduct = createAsyncThunk<
    ProductsType,
    { token: string; productData: ProductInput },
    { rejectValue: string }
>(
    "products/createProduct",
    async ({ token, productData }, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/products`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return res.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Product creation failed"
                );
            }
            return rejectWithValue("Unexpected Error");
        }
    }
);

export const deleteproduct = createAsyncThunk<
    string,
    { token: string; id: string },
    { rejectValue: string }
>("products/deleteProduct", async ({ token, id }, { rejectWithValue }) => {
    try {
        await axios.delete(`${BASE_URL}/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(
                error.response?.data?.message || "Product delete failed"
            );
        }
        return rejectWithValue("Unexpected Error");
    }
});

export const updateproducts = createAsyncThunk<
    ProductsType,
    {
        token: string;
        id: string;
        name: string;
        discountPrice: number;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
    },
    { rejectValue: string }
>(
    "products/updateProduct",
    async ({ token, id, ...updateData }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/api/products/${id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message || "Product Update failed"
                );
            }
            return rejectWithValue("Unexpected Error");
        }
    }
);

const productsslice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetProducts.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(
                GetProducts.fulfilled,
                (state, action: PayloadAction<ProductsType[]>) => {
                    state.Items = action.payload;
                    state.loading = "succeeded";
                }
            )
            .addCase(GetProducts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message || "Server not found";
            })
            .addCase(
                createProduct.fulfilled,
                (state, action: PayloadAction<ProductsType>) => {
                    state.Items.push(action.payload);
                }
            )
            .addCase(
                deleteproduct.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.Items = state.Items.filter((f) => f._id !== action.payload);
                }
            )
            .addCase(
                updateproducts.fulfilled,
                (state, action: PayloadAction<ProductsType>) => {
                    const exist = state.Items.find((f) => f._id === action.payload._id);
                    if (exist) {
                        exist.name = action.payload.name;
                        exist.description = action.payload.description;
                        exist.discountPrice = action.payload.discountPrice;
                        exist.price = action.payload.price;
                        exist.stock = action.payload.stock;
                        exist.categoryId = action.payload.categoryId;
                    }
                }
            );
    },
});
export default productsslice.reducer;
