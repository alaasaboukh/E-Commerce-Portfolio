import { ProductsType } from "@/lib/types";
import { addToCart } from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ShoppingCartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddToCart = ({ item }: { item: ProductsType }) => {
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const t = useTranslations("products");
    const dispatch = useDispatch<AppDispatch>();

    const addCart = async (
        item: ProductsType,
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        try {
            await dispatch(
                addToCart({
                    token,
                    userId,
                    productId: item._id,
                    quantity: 1,
                    price: item.price,
                    name: item.name,
                })
            ).unwrap();
            toast.success(t("added"));
        } catch (err) {
            const errorMessage = typeof err === "string" ? err : "Unexpected error";

            if (errorMessage.includes("input must be a 24 character hex string")) {
                toast.error(t("Login First"));
            } else {
                toast.error(t(errorMessage));
            }
        }
    };
    return (
        <>
            <button
                aria-label={t("Add To Cart")}
                title={t("Add To Cart")}
                type="button"
                onClick={(e) => addCart(item, e)}
                className="relative w-full h-[35px] cursor-pointer bg-[#222] rounded-md text-white font-sans overflow-hidden transition duration-700 group"
            >
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:-top-14 bg-[var(--color-secondary)] text-white">
                    {t("Add To Cart")}
                </div>
                <div className="absolute inset-0 flex items-center justify-center -bottom-16 transition-all duration-500 group-hover:bottom-0">
                    <ShoppingCartIcon className="w-6 h-6 text-white" />
                </div>
            </button>
        </>
    );
};

export default AddToCart;
