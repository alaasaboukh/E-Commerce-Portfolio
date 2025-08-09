"use client";

import RatingStars from "@/components/library/RatingStars";
import { RootState } from "@/redux/store";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
    clearmessage,
    deleteFromWishList,
    loadWishlist,
} from "@/redux/wishlistSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import AddToCart from "@/components/cart/AddToCart";

const Page = () => {
    const favorite = useSelector((state: RootState) => state.wishList.favorite);
    const dispatch = useDispatch();
    const wishListMessage = useSelector(
        (state: RootState) => state.wishList.message
    );
    const t = useTranslations("wishlist");
    const l = useTranslations("products");
    const locale = useLocale();

    useEffect(() => {
        const wishlist = localStorage.getItem("wishList");
        if (wishlist) {
            const parsed = JSON.parse(wishlist);
            dispatch(loadWishlist(parsed));
        }
    }, [dispatch]);

    useEffect(() => {
        if (wishListMessage) {
            toast.success(t(wishListMessage));
            dispatch(clearmessage());
        }
    }, [dispatch, t, wishListMessage]);

    return (
        <div className="mt-28">
            <div className="container">
                <h1 className="text-lg font-bold mb-6">
                            {t("wishlist")} ({favorite.length})
                        </h1>
                {favorite.length === 0 ? (
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold" role="alert" aria-live="polite">
                            {t("emptyy")}{" "}
                            <span className="text-[var(--color-secondary)]">
                                {t("empty")}
                            </span>
                        </h1>
                        <div>
                            <Link
                                href={`/${locale}/products`}
                                aria-label="products"
                                className={`flex gap-1 font-bold items-center text-lg text-[var(--color-secondary)] p-3 cursor-pointer ${locale === "ar" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <span>
                                    <ArrowLeft size={20} />
                                </span>
                                <p>{t("return")}</p>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                            {favorite.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white shadow-md p-3 rounded relative"
                                >
                                    {item.images?.length > 0 && (
                                        <div className="flex flex-col gap-3">
                                            <div className="w-[140px] h-[140px] mx-auto">
                                                <Image
                                                    src={item.images[0]}
                                                    alt={`locale === "ar" ? l(fav.name) : fav.name`}
                                                    width={125}
                                                    height={125}
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <h1 className="font-bold text-lg">
                                                {locale === "ar" ? l(item.name) : item.name}
                                            </h1>
                                            <p className="text-gray-700">
                                                {locale === "ar"
                                                    ? l(item.description)
                                                    : item.description}
                                            </p>
                                            <div className="flex gap-3">
                                                <p className="text-[var(--color-secondary)]">
                                                    ${item.price - item.discountPrice}
                                                </p>
                                                <p className="line-through text-gray-500">
                                                    ${item.price}
                                                </p>
                                            </div>
                                            <RatingStars rating={4.5} count={105} />
                                            <div className="absolute top-5 right-5 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer">
                                                <Trash2
                                                    size={20}
                                                    onClick={() => dispatch(deleteFromWishList(item._id))}
                                                />
                                            </div>

                                            <AddToCart item={item} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
