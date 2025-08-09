// components/Footer.tsx
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    return (
        <footer className="bg-black text-white px-4 pt-10 mt-24">
            <div className="container flex flex-wrap justify-between gap-4 max-md:flex-col">
                <div>
                    <h2 className="text-lg font-bold mb-4">{t("exclusive")}</h2>
                    <div className="space-y-2 text-sm flex flex-col">
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("subscribe")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("discount")}
                        </span>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">{t("support")}</h2>
                    <div className="space-y-2 text-sm flex flex-col">
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("address")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("email")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("phone")}
                        </span>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">{t("account")}</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            <Link href={`/${locale}/profile`} aria-label="profile">
                                {t("myAccount")}
                            </Link>
                        </li>
                        <li className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            <Link href={`/${locale}/login`} aria-label="login">
                                {t("loginRegister")}
                            </Link>
                        </li>
                        <li className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            <Link href={`/${locale}/cart`} aria-label="cart">
                                {t("cart")}
                            </Link>
                        </li>
                        <li className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            <Link href={`/${locale}/wishList `} aria-label="wishlist">
                                {t("wishlist")}
                            </Link>
                        </li>
                        <li className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            <Link href={`/${locale}/products`} aria-label="products">
                                {t("shop")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-4">{t("quickLink")}</h2>
                    <div className="space-y-2 text-sm flex flex-col">
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("privacyPolicy")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("terms")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("faq")}
                        </span>
                        <span className="hover:text-[var(--color-secondary)] transition-all duration-500">
                            {t("contact")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400">
                {t("copyright")}
            </div>
        </footer>
    );
}
