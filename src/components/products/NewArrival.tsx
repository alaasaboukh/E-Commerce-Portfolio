import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import MotionWrapper from "../library/MotionWrapper";
import Link from "next/link";

const NewArrival = () => {
    const t = useTranslations("newArrival");
    const locale = useLocale();
    const alignment = locale === "ar" ? "bottom-5 right-5" : "bottom-5 left-5";

    return (
        <article className="mt-24">
            <div className="container">
                <MotionWrapper>
                    <div className={`global ${locale === "ar" ? "rtl-global" : ""}`}>
                        {t("featured")}
                    </div>
                </MotionWrapper>
                <MotionWrapper>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
                        {t("title")}
                    </h1>
                </MotionWrapper>

                <MotionWrapper>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
                        <div className="relative bg-black rounded-lg overflow-hidden">
                            <Image
                                src="/images/playstaions.png"
                                alt="PlayStation 5"
                                fill
                                className="object-contain"
                                priority
                            />
                            <div
                                className={`absolute text-white max-w-[80%] ${alignment}`}
                            >
                                <h2 className="text-lg max-md:text-sm font-semibold mb-2">
                                    {t("playstationTitle")}
                                </h2>
                                <p className="text-sm max-md:text-xs text-gray-300 mb-2">
                                    {t("playstationDescription")}
                                </p>
                                <Link
                                    href={`/${locale}/products`}
                                    aria-label="products"
                                    className="underline text-xs hover:text-[var(--color-secondary)] transition-all duration-500"
                                >
                                    {t("shopNow")}
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="relative bg-black rounded-lg overflow-hidden flex-1 basis-1/2">
                                <Image
                                    src="/images/woman1.jpg"
                                    alt="Women’s Collections"
                                    fill
                                    className="object-contain rotate-y-180"
                                    loading="lazy"
                                />
                                <div
                                    className={`absolute text-white max-w-[80%] ${alignment}`}
                                >
                                    <h2 className="text-lg max-md:text-sm font-semibold mb-2">
                                        {t("womenTitle")}
                                    </h2>
                                    <p className="text-sm max-md:text-xs text-gray-300 mb-2">
                                        {t("womenDescription")}
                                    </p>
                                    <Link
                                        href={`/${locale}/products`}
                                        aria-label="products"
                                        className="underline text-xs hover:text-[var(--color-secondary)] transition-all duration-500"
                                    >
                                        {t("shopNow")}
                                    </Link>
                                </div>
                            </div>

                            <div className="flex gap-6 flex-1 basis-1/2">
                                <div className="relative bg-black rounded-lg overflow-hidden w-1/2 ">
                                    <Image
                                        src="/images/speaker3.png"
                                        alt="Speakers"
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                    <div
                                        className={`absolute text-white max-w-[80%] ${alignment}`}
                                    >
                                        <h2 className="max-md:text-sm font-semibold mb-2">
                                            {t("speakersTitle")}
                                        </h2>
                                        <p className="text-sm max-md:text-xs text-gray-300 mb-2">
                                            {t("speakersDescription")}
                                        </p>
                                        <Link
                                            href={`/${locale}/products`}
                                            aria-label="products"
                                            className="underline text-xs hover:text-[var(--color-secondary)] transition-all duration-500"
                                        >
                                            {t("shopNow")}
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative bg-black rounded-lg overflow-hidden w-1/2">
                                    <Image
                                        src="/images/perfum.png"
                                        alt="Perfume"
                                        fill
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                    <div
                                        className={`absolute text-white max-w-[80%] ${alignment}`}
                                    >
                                        <h2 className="max-md:text-sm font-semibold mb-2">
                                            {t("perfumeTitle")}
                                        </h2>
                                        <p className="text-sm max-md:text-xs text-gray-300 mb-1">
                                            {t("perfumeDescription")}
                                        </p>
                                        <Link
                                            href={`/${locale}/products`}
                                            aria-label="products"
                                            className="underline text-xs hover:text-[var(--color-secondary)] transition-all duration-500"
                                        >
                                            {t("shopNow")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionWrapper>
            </div>
        </article>
    );
};

export default NewArrival;