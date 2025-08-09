import { ProductsType } from "@/lib/types";
import {
    decreaseQuantity,
    deleteItem,
    increaseQuantity,
} from "@/redux/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import MotionWrapper from "../library/MotionWrapper";

const CartMobile = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const t = useTranslations("cart");
    const l = useTranslations("products");
    const locale = useLocale();
    const dispatch = useDispatch<AppDispatch>();
    const getLocalized = (text: string) => (locale === "ar" ? l(text) : text);

    const handleDelete = async (item: ProductsType) => {
        try {
            await dispatch(
                deleteItem({
                    userId,
                    productId: item.productId._id,
                    token,
                })
            ).unwrap();
            toast.success(t("deleteMessage"));
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error(String(err));
            }
        }
    };

    const handleIncreaseQuantity = async (item: ProductsType) => {
        try {
            await dispatch(
                increaseQuantity({
                    token,
                    userId,
                    productId: item.productId._id,
                    quantity: item.quantity + 1,
                })
            ).unwrap();
            toast.success(t("increaseSuccess"));
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error(String(err));
            }
        }
    };

    const handleDecreaseQuantity = async (item: ProductsType) => {
        try {
            await dispatch(
                decreaseQuantity({
                    token,
                    userId,
                    productId: item.productId._id,
                    quantity: item.quantity - 1,
                })
            ).unwrap();
            toast.success(t("decreaseSuccess"));
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error(String(err));
            }
        }
    };

    return (
        <>
            <div className="md:hidden">
                {" "}
                {cart.map((item) => (
                    <MotionWrapper key={item._id}>
                        <div className="border-b border-gray-200 p-4 mb-4">
                            <div className="flex items-center gap-5">
                                {item.productId?.images?.[0] && (
                                    <Image
                                        src={item.productId?.images?.[0]}
                                        alt={getLocalized(item.name)}
                                        width={70}
                                        height={70}
                                        priority={false}
                                    />
                                )}
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold">{getLocalized(item.name)}</h3>
                                    <p className="text-sm text-gray-500">${item.price}</p>
                                    <div
                                        className={`flex items-center gap-3 ${locale === "ar" ? "flex-row-reverse" : ""
                                            }`}
                                    >
                                        <button
                                            onClick={() => handleDecreaseQuantity(item)}
                                            aria-label={t("decreaseSuccess")}
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item)}
                                            aria-label={t("increaseSuccess")}
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm">
                                        {t("subtotal")}:{" "}
                                        {locale === "ar"
                                            ? `${(item.price * item.quantity).toFixed(2)}$`
                                            : `$${(item.price * item.quantity).toFixed(2)}`}
                                    </p>
                                    <button
                                        onClick={() => handleDelete(item)}
                                        aria-label="delete"
                                        className={`text-sm text-[var(--color-secondary)] mt-2 inline-block ${locale === "ar" ? "text-right" : "text-left"
                                            }`}
                                    >
                                        {t("remove")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MotionWrapper>
                ))}
            </div>
        </>
    );
};

export default CartMobile;
