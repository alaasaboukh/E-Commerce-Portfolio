"use client";

import { deleteproduct, GetProducts } from "@/redux/productSlice";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import RatingStars from "@/components/library/RatingStars";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Swiper as SwiperType } from "swiper";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import Categories from "../categories/Categories";
import { useLocale, useTranslations } from "next-intl";
import Updateproducts from "./Updateproducts";
import MotionWrapper from "../library/MotionWrapper";
import Form from "./Form";
import AddToCart from "../cart/AddToCart";
import ToggleWishList from "./ToggleWishList";
import { clearmessage } from "@/redux/wishlistSlice";
import { toast } from "sonner";

const Products = () => {
    const { token, role } = useSelector((state: RootState) => state.auth);
    const items = useSelector((state: RootState) => state.products.Items);

    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations("products");
    const locale = useLocale();

        const wishListMessage = useSelector(
        (state: RootState) => state.wishList.message
    );
    const l = useTranslations("wishlist");

    const [searchQuery, setSearchQuery] = useState("");
    const perPage = 8;

    const swiperRef = useRef<SwiperType | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("");
    const isLoading = useMemo(() => items.length === 0, [items]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getTranslated = (val: string) =>
        locale === "ar" ? t(val).toLowerCase() : val.toLowerCase();

    useEffect(() => {
        dispatch(GetProducts());
    }, [dispatch]);

    const filteredItems = useMemo(() => {
        return items.filter((i) => {
            const name = getTranslated(i.name);
            return (
                name.includes(searchQuery.toLowerCase()) &&
                (selectedCategory === "" || i.categoryId === selectedCategory)
            );
        });
    }, [getTranslated, items, searchQuery, selectedCategory]);

    const groupedItems = useMemo(() => {
        const groups = [];
        for (let i = 0; i < filteredItems.length; i += perPage) {
            groups.push(filteredItems.slice(i, i + perPage));
        }
        return groups;
    }, [filteredItems, perPage]);

        useEffect(() => {
        if (wishListMessage) {
            toast.success(l(wishListMessage));
            dispatch(clearmessage());
        }
    }, [dispatch, l, wishListMessage]);

    return (
        <section className="mt-40">
            <div className="container">
                {isLoading ? (
                    <div className="flex items-center justify-center flex-col">
                        <div className="loading"></div>
                        <p className="text-gray-500 text-sm mt-2">{t("loading")}</p>
                    </div>
                ) : (
                    <>
                        <Form />
                        <MotionWrapper>
                            <div className={`global ${locale === "ar" ? "rtl-global" : ""}`}>
                                {t("Today's")}
                            </div>
                        </MotionWrapper>
                        <MotionWrapper>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
                                {t("Flash Sales")}
                            </h1>
                        </MotionWrapper>
                        <MotionWrapper>
                            <div className="flex mb-5">
                                <div className="flex-[1]">
                                    <form action="">
                                        <input
                                            type="text"
                                            placeholder={t("Search Your Product")}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="outline-none bg-[#f5f5f5] p-2 rounded-sm shadow w-1/2 focus:w-3/4 max-md:w-3/4 max-md:placeholder:text-xs
                                            max-md:focus:w-full border border-gray-200 transition-all duration-500 placeholder:text-sm"
                                        />
                                    </form>
                                </div>
                                <div
                                    className={`flex gap-2 justify-end flex-[1] ${locale === "ar"
                                            ? "flex-row-reverse justify-start"
                                            : "flex-row"
                                        }`}
                                >
                                    <button
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        aria-label="Previous Slide"
                                        className="bg-[#f5f5f5] rounded-full p-2 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer"
                                    >
                                        <ArrowLeft size={23} />
                                    </button>
                                    <button
                                        onClick={() => swiperRef.current?.slideNext()}
                                        aria-label="Next Slide"
                                        className="bg-[#f5f5f5] rounded-full p-2 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer"
                                    >
                                        <ArrowRight size={23} />
                                    </button>
                                </div>
                            </div>
                        </MotionWrapper>
                        <MotionWrapper>
                            <div>
                                <Categories
                                    onCategorySelect={setSelectedCategory}
                                    selectedCategory={selectedCategory}
                                />
                            </div>
                        </MotionWrapper>
                        {filteredItems.length === 0 ? (
                            <p className="text-gray-500 text-center mt-4">
                                {t("noproduct")}
                            </p>
                        ) : (
                            <Swiper
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                spaceBetween={30}
                                allowTouchMove
                            >
                                {groupedItems.map((group, index) => (
                                    <SwiperSlide key={index}>
                                            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                                                {group.map((item) => (
                                                    <MotionWrapper key={item._id}>
                                                        <div className="bg-white shadow-md p-3 rounded relative flex flex-col gap-3 hover:scale-105 transition-all duration-500">
                                                            {Array.isArray(item.images) &&
                                                                item.images.length > 0 && (
                                                                    <div className="flex flex-col gap-3">
                                                                        <div className="w-[140px] h-[140px] mx-auto">
                                                                            <Image
                                                                                src={item.images[0]}
                                                                                alt={`Image ${item.description}`}
                                                                                width={125}
                                                                                height={125}
                                                                                className="object-cover"
                                                                            />
                                                                        </div>
                                                                        <h1 className="font-bold text-lg">
                                                                            {locale === "ar"
                                                                                ? t(item.name)
                                                                                : item.name}
                                                                        </h1>
                                                                        <p className="text-gray-600">
                                                                            {locale === "ar"
                                                                                ? t(item.description)
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
                                                                            <ToggleWishList item={item} />
                                                                        </div>

                                                                        <Link href={`products/${item._id}`}>
                                                                            <div className="absolute top-12 right-5 transition-all duration-500 hover:text-[var(--color-secondary)] cursor-pointer">
                                                                                <Eye size={20} />
                                                                            </div>
                                                                        </Link>
                                                                        <AddToCart item={item} />
                                                                        {role === "admin" && (
                                                                            <>
                                                                                <button
                                                                                    aria-label={`Delete ${item.name}`}
                                                                                    onClick={() =>
                                                                                        dispatch(
                                                                                            deleteproduct({
                                                                                                token,
                                                                                                id: item._id,
                                                                                            })
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    delete
                                                                                </button>
                                                                                <Updateproducts item={item} />
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </MotionWrapper>
                                                ))}
                                            </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Products;
