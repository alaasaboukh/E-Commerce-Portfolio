import { ProductsType } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface ShippingAddress {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

interface OrderPayload {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    shippingAddress: ShippingAddress;
}

interface ProductItem {
    Orders: ProductsType[];
    loading: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ProductItem = {
    Orders: [],
    loading: "idle",
    error: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const CreateOrder = createAsyncThunk(
    "Orders/CreateOrder",
    async (
        { token, orderPayload }: { token: string; orderPayload: OrderPayload },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(`${BASE_URL}/api/orders`, orderPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return res.data.data;
        } catch (error: unknown) {
            let message = "Order creation failed";
            if (axios.isAxiosError(error)) {
                message = error.response?.data?.message ?? message;
            }
            return rejectWithValue(message);
        }
    }
);

const OrderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
});
export default OrderSlice.reducer;
