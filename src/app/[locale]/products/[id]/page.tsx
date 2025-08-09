"use client";

import { use, useEffect } from "react";
import React, { useState } from "react";
import Image from "next/image";
import RatingStars from "@/components/library/RatingStars";
import { RefreshCcw, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { ProductsType } from "@/lib/types";
import AddToCart from "@/components/cart/AddToCart";
import ToggleWishList from "@/components/products/ToggleWishList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";
import { clearmessage } from "@/redux/wishlistSlice";

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const t = useTranslations("productId");
    const l = useTranslations("products");
    const locale = useLocale();
    const dispatch = useDispatch<AppDispatch>();

    const wishListMessage = useSelector(
        (state: RootState) => state.wishList.message
    );
    const m = useTranslations("wishlist");

    const sizes = [
        { id: 1, label: "XS" },
        { id: 2, label: "S" },
        { id: 3, label: "M" },
        { id: 4, label: "L" },
        { id: 5, label: "XL" },
    ];

    const colors = [
        { id: 1, hex: "#A0BCE0" },
        { id: 2, hex: "#E07575" },
        { id: 3, hex: "#6EE7B7" },
    ];

    const { id } = use(params);
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [error, setError] = useState("");

    const [selectSize, setSelectSize] = useState(3);
    const [selectedColor, setSelectedColor] = useState<number>(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${BASE_URL}/api/products/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setProduct(data.data);
                } else {
                    setError("Product not found");
                }
            } catch {
                setError("Server error");
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (wishListMessage) {
            toast.success(m(wishListMessage));
            dispatch(clearmessage());
        }
    }, [dispatch, m, wishListMessage]);

    if (error) return <div>{error}</div>;
    if (!product)
        return (
            <div className="flex items-center justify-center flex-col">
                <div className="loading"></div>
                <p className="text-gray-500 text-sm mt-2">{l("loading")}</p>
            </div>
        );

    return (
        <div className="my-28">
            <div className="container flex gap-4 max-md:flex-col">
                <div className="flex flex-[1]">
                    <Image
                        src={product.images[0]}
                        alt=""
                        width={400}
                        height={400}
                        className="object-contain max-sm:w-[300px] max-sm:h-[300px]"
                    />
                </div>
                <div className="flex flex-col flex-[1]">
                    <div className="mb-5 border-b-2 border-[#DDD] pb-7">
                        <h1 className="text-3xl font-bold mb-2">
                            {locale === "ar" ? l(product.name) : product.name}
                        </h1>
                        <div className="flex gap-3 mb-2">
                            <RatingStars rating={4.5} count={105} />
                            <span>|</span>
                            <span className="text-green-500 ">{t("inStock")}</span>
                        </div>
                        <h2 className="text-2xl mb-2">${product.price}</h2>
                        <p className="text-md ">
                            {locale === "ar" ? l(product.description) : product.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-3 items-center">
                            <span>{t("colors")}:</span>
                            <ul className="flex gap-2">
                                {colors.map((color) => (
                                    <li
                                        key={color.id}
                                        onClick={() => setSelectedColor(color.id)}
                                        className={`
                                                    w-5 h-5 rounded-full cursor-pointer
                                                    border-2 transition-all
                                                ${selectedColor === color.id
                                                ? "border-2 border-white outline-2"
                                                : "border-gray-300"
                                            }
                                                `}
                                        style={{ backgroundColor: color.hex }}
                                    ></li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span>{t("size")}:</span>
                            <ul className="flex gap-2">
                                {sizes.map((size) => (
                                    <li
                                        onClick={() => setSelectSize(size.id)}
                                        key={size.id}
                                        className={`border border-gray-500 p-3 text-xs rounded-xs w-6 h-6 flex justify-center items-center cursor-pointer transition-all duration-500 ${selectSize === size.id
                                                ? "bg-[var(--color-secondary)] text-white"
                                                : ""
                                            }`}
                                    >
                                        {size.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="flex-1">
                                <AddToCart item={product} />
                            </div>
                            <span className="flex-1 mb-1.5">
                                <ToggleWishList item={product} />
                            </span>
                        </div>
                        <div className="mt-4 border border-gray-500 rounded">
                            <div className="flex items-center gap-3 p-3 border-b border-gray-500">
                                <Truck size={30} />
                                <div>
                                    <span>{t("freeDelivery")}</span>
                                    <p className="text-xs mt-2 underline">{t("postalPrompt")}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center p-3">
                                <RefreshCcw size={30} />
                                <div>
                                    <span>{t("returnDelivery")}</span>
                                    <p className="text-sm mt-2">{t("returnDetails")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
