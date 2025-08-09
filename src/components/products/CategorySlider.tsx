"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { categorySlides } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";
import MotionWrapper from "../library/MotionWrapper";
import Link from "next/link";

const CategorySlider = () => {
    const t = useTranslations("titles");
    const locale = useLocale();
    return (
        <section className="w-full mt-24 container" aria-label="Featured Categories Slider">
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
            >
                {categorySlides.map((category) => (
                    <SwiperSlide key={category.id}>
                        <MotionWrapper>
                            <div className="px-5 bg-black flex justify-around items-center h-[350px] overflow-hidden rounded-lg p-5">
                                <div>
                                    <h4 className="text-[var(--color-secondary)] mb-5 font-semibold">
                                        {t("category")}
                                    </h4>
                                    <h2 className="text-5xl text-white font-bold mb-6 max-md:text-2xl">
                                        {t(category.title)}
                                    </h2>
                                    <Link
                                        href={`/${locale}/products`}
                                        className="btn-animated-link"
                                        aria-label="products"
                                    >
                                        <span className="text text-xs">{t("shop")}</span>
                                        <span className="bg-left"></span>
                                        <span className="bg-right"></span>
                                    </Link>
                                </div>
                                <div>
                                    <Image
                                        src={category.image}
                                        alt={t(category.title)}
                                        width={300}
                                        height={300}
                                        className="rounded-xl shadow-2xl max-md:w-[200px] max-md:h-[200px] object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </MotionWrapper>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CategorySlider;
