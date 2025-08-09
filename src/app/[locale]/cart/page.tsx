"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    decreaseQuantity,
    deleteItem,
    getUserCart,
    increaseQuantity,
} from "@/redux/cartSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";
import { ProductsType } from "@/lib/types";
import MotionWrapper from "@/components/library/MotionWrapper";
import CartMobile from "@/components/cart/CartMobile";

const Page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const t = useTranslations("cart");
    const l = useTranslations("products");
    const locale = useLocale();
    const totalprice = useMemo(
        () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
        [cart]
    );
    const loading = useSelector((state: RootState) => state.cart.loading);
    const getLocalized = (text: string) => locale === 'ar' ? l(text) : text;

    useEffect(() => {
        dispatch(getUserCart({ token, userId }));
    }, [dispatch, token, userId]);

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
}
if (loading) {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="loading"></div>
            <p className="text-gray-500 text-sm mt-2">{l("loading")}</p>
        </div>
    );
}

return (
    <div className="mt-28">
        {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-[24vh]">
                <h1 className="text-3xl font-bold">
                    {t("empty")}{" "}
                    <span className="text-[var(--color-secondary)]">{t("emtty")} </span>
                </h1>
                <Link
                    href={`/${locale}/products`}
                    className={`flex items-center gap-1 text-lg text-[var(--color-secondary)] p-3 cursor-pointer ${locale === "ar" ? "flex-row-reverse" : ""
                        }`}
                >
                    <span className="">
                        <ArrowLeft size={20} />
                    </span>
                    <p>{t("returnShopping")}</p>
                </Link>
            </div>
        ) : (
            <div className="container flex gap-8 max-md:flex-col">
                <div className="flex-2">
                    <MotionWrapper>
                        <div className="overflow-x-auto hidden md:block">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr>
                                        <th
                                            className={`p-3 ${locale === "ar" ? "text-right" : "text-left"
                                                }`}
                                        >
                                            {t("productDetails")}
                                        </th>
                                        <th>{t("price")}</th>
                                        <th>{t("quantity")}</th>
                                        <th>{t("subtotal")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item._id}>
                                            <td className="flex gap-4 items-center p-3">
                                                {item.productId?.images?.[0] && (
                                                    <Image
                                                        src={item.productId?.images?.[0]}
                                                        alt={getLocalized(item.name)}
                                                        width={70}
                                                        height={70}
                                                        loading="lazy"
                                                    />
                                                )}
                                                <div>
                                                    <p className="mb-1 font-semibold">
                                                        {getLocalized(item.name)}
                                                    </p>
                                                    <button
                                                        onClick={() => handleDelete(item)}
                                                        aria-label="delete"
                                                        className="text-sm text-[var(--color-secondary)] cursor-pointer"
                                                    >
                                                        {t("remove")}
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">${item.price}</td>
                                            <td className="text-center">
                                                <div
                                                    className={`flex items-center justify-center gap-4 ${locale === "ar" ? "flex-row-reverse" : ""
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => handleDecreaseQuantity(item)}
                                                        aria-label={t('decreaseSuccess')}
                                                        className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer"
                                                    >
                                                        −
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncreaseQuantity(item)}
                                                        aria-label={t('increaseSuccess')}
                                                        className="w-6 h-6 rounded-xs bg-gray-200 hover:bg-gray-300 transition-all duration-300 cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <CartMobile />

                        <Link
                            href={`/${locale}/products`}
                            aria-label="products"
                            className={`flex items-center gap-1 text-[var(--color-secondary)] m-3 cursor-pointer ${locale === "ar" ? "flex-row-reverse justify-end" : ""
                                }`}
                        >
                            <ArrowLeft size={20} />
                            <span>{t("continueShopping")}</span>
                        </Link>
                    </MotionWrapper>
                </div>

                <div className="flex-1 p-5 bg-white">
                    <MotionWrapper>
                        <h2 className="text-2xl font-bold mb-3">{t("cartTotal")}</h2>
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-between">
                                <h3 className="text-gray-600">
                                    {locale === "ar"
                                        ? `${cart.length} ${t("items")}`
                                        : `${t("items")} ${cart.length}`}
                                </h3>
                                <span>${totalprice}</span>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-600">{t("shippingFree")}</h3>
                                <span>{t("free")}</span>
                            </div>
                            <div className="flex justify-between">
                                <h3 className="text-gray-600">{t("tax")}</h3>
                                <span>2%</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-300 pt-3">
                                <h3 className="font-semibold">{t("total")}</h3>
                                <span className="font-semibold">
                                    ${(totalprice + totalprice * 0.02).toFixed(2)}
                                </span>
                            </div>
                            <Link
                                href={`/${locale}/checkout`}
                                aria-label="checkout"
                                className="text-center px-4 py-2 max-md:w-1/2 rounded text-white bg-[var(--color-secondary)] cursor-pointer hover:bg-red-700 transition-all duration-500"
                            >
                                {t("checkout")}
                            </Link>
                        </div>
                    </MotionWrapper>
                </div>
            </div>
        )}
    </div>
);
};

export default Page;
