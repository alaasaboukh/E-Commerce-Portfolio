"use client";

import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const LandingPage = () => {
    const t = useTranslations("banner");
    const locale = useLocale();
    return (
        <div
            className={`relative w-full h-[calc(100vh-75px)] top-[75px] ${locale === "ar"
                    ? "bg-gradient-to-r from-[var(--color-secondary)] to-black"
                    : "bg-gradient-to-r from-black to-[var(--color-secondary)]"
                } `}
        >
            <div className="container h-full flex items-center overflow-auto max-md:flex-col">
                <div className="flex-[2] max-md:flex-[1]">
                    <AnimatedTitle text={t("text")} id="hero-title" />
                    <h2 className="text-3xl max-md:text-lg font-bold text-white mb-5">
                        {t("headline")}
                    </h2>
                    <p className="text-lg max-md:text-sm font-bold text-white mb-6">
                        {t("subtext")}
                    </p>
                    <Link href={`/${locale}/products`} className="btn-animated-link" aria-label="products">
                        <span className="text">{t("shop")}</span>
                        <span className="bg-left"></span>
                        <span className="bg-right"></span>
                    </Link>
                </div>
                <div className="flex-[1]">
                    <Image
                        src="/images/landing.png"
                        alt="Landing page product showcase"
                        className="object-cover max-md:w-[220px] max-md:h-[220px] "
                        width={350}
                        height={350}
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
