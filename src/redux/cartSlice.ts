import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsType } from "@/lib/types";
import axios from "axios";

interface CartItem {
    cart: ProductsType[];
    loading: boolean;
}

const initialState: CartItem = {
    cart: [],
    loading: false,
};

export const getUserCart = createAsyncThunk(
    "cart/GetUserCart",
    async ({ userId, token }: { userId: string; token: string }) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
                {
                    params: { userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data.data.items;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message || "Failed to get user's cart"
                );
            }
            throw new Error("Unexpected error occurred while getting cart");
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/AddToCart",
    async (
        {
            token,
            userId,
            quantity,
            name,
            productId,
            price,
        }: {
            token: string;
            userId: string;
            quantity: number;
            name: string;
            productId: string;
            price: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart`,
                {
                    productId,
                    name,
                    price,
                    quantity,
                },
                {
                    params: { userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = response.data;

            if (data.success === false) {
                return rejectWithValue(data.message);
            }

            return data.data.items;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(
                    error.response?.data?.message ||
                    "An error occurred while adding the item to the cart."
                );
            }
            return rejectWithValue("Unexpected error while adding to cart.");
        }
    }
);

export const deleteItem = createAsyncThunk(
    "cart/Deletecart",
    async ({
        userId,
        productId,
        token,
    }: {
        userId: string;
        productId: string;
        token: string;
    }) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/item/${productId}`,
                {
                    params: { userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return productId;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message || "Error in remove item"
                );
            }
            throw new Error("Unexpected error while deleting item.");
        }
    }
);

export const increaseQuantity = createAsyncThunk(
    "cart/IncreasQuantity",
    async ({
        token,
        userId,
        quantity,
        productId,
    }: {
        token: string;
        userId: string;
        quantity: number;
        productId: string;
    }) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/item/${productId}`,
                { quantity },
                {
                    params: { userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedItem = res.data.data.items.find(
                (item: ProductsType) => item.productId._id === productId
            );

            return {
                productId,
                quantity: updatedItem?.quantity || quantity,
            };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message ||
                    "Error Increase Quantity or Error server"
                );
            }
            throw new Error("Unexpected error while increasing quantity.");
        }
    }
);

export const decreaseQuantity = createAsyncThunk(
    "cart/decreaseQuantity",
    async ({
        token,
        userId,
        quantity,
        productId,
    }: {
        token: string;
        userId: string;
        quantity: number;
        productId: string;
    }) => {
        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/cart/item/${productId}`,
                { quantity },
                {
                    params: { userId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedItem = res.data.data.items.find(
                (item: ProductsType) => item.productId._id === productId
            );

            return {
                productId,
                quantity: updatedItem?.quantity || quantity,
            };
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                throw new Error(
                    error.response?.data?.message ||
                    "Error Decrease Quantity or server error"
                );
            }
            throw new Error("Unexpected error while decreasing quantity.");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(
                addToCart.fulfilled,
                (state, action: PayloadAction<ProductsType[]>) => {
                    state.cart = action.payload;
                }
            )
            .addCase(getUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(getUserCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.cart = state.cart.filter(
                    (item) => item.productId._id !== action.payload
                );
            })
            .addCase(
                increaseQuantity.fulfilled,
                (
                    state,
                    action: PayloadAction<{ quantity: number; productId: string }>
                ) => {
                    const exist = state.cart.find(
                        (f) => f.productId._id === action.payload.productId
                    );
                    if (exist) {
                        exist.quantity = action.payload.quantity;
                    }
                }
            )
            .addCase(
                decreaseQuantity.fulfilled,
                (
                    state,
                    action: PayloadAction<{ quantity: number; productId: string }>
                ) => {
                    const exist = state.cart.find(
                        (f) => f.productId._id === action.payload.productId
                    );
                    if (exist) {
                        exist.quantity = action.payload.quantity;
                    }
                }
            );
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
