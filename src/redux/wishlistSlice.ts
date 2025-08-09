import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsType } from "@/lib/types";

interface wishListItem {
    favorite: ProductsType[];
    message: string;
}

const initialState: wishListItem = {
    favorite: [],
    message: "",
};

export const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        toggleWishList: (state, action: PayloadAction<ProductsType>) => {
            const exist = state.favorite.find((f)=> f._id === action.payload._id)
            if(!exist) {
                state.favorite.push(action.payload);
                localStorage.setItem("wishList", JSON.stringify(state.favorite));
                state.message = "Added to wishlist successfully";
            } else {
                state.favorite = state.favorite.filter(
                    (item) => item._id !== action.payload._id
                );
                localStorage.setItem("wishList", JSON.stringify(state.favorite));
                state.message = "Removed from wishlist";
            }
        },
        deleteFromWishList: (state, action: PayloadAction<string>) => {
            state.favorite = state.favorite.filter(
                (item) => item._id !== action.payload
            );
            localStorage.setItem("wishList", JSON.stringify(state.favorite));
            state.message = "Removed from wishlist";
        },
        clearmessage:(state)=>{
                state.message =''
            },
            loadWishlist: (state, action: PayloadAction<ProductsType[]>) => {
            state.favorite = action.payload;
    }
    },
});

export const { toggleWishList, deleteFromWishList, clearmessage, loadWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
