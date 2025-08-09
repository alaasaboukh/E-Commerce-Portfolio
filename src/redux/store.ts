import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productSlice"
import cartReducer from "./cartSlice";
import wishListReducer from "./wishlistSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./usersSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        wishList: wishListReducer,
        category: categoryReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;