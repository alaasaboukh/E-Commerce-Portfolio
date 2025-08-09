import { ProductsType } from "@/lib/types";
import { AppDispatch, RootState } from "@/redux/store";
import { toggleWishList } from "@/redux/wishlistSlice";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ToggleWishList = ({ item }: { item: ProductsType }) => {
    const favorites = useSelector((state: RootState) => state.wishList.favorite);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <button onClick={() => dispatch(toggleWishList(item))}>
            <Heart
                size={20}
                className="transition-all duration-300 cursor-pointer"
                fill={favorites.some((fav) => fav._id === item._id) ? "red" : "none"}
                color={favorites.some((fav) => fav._id === item._id) ? "red" : "#333"}
            />
        </button>
    );
};

export default ToggleWishList;
