"use client";

import { Heart, MenuIcon, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLinks } from "@/lib/types";
import SideBar from "./SideBar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { getUserCart } from "@/redux/cartSlice";
import { loadWishlist } from "@/redux/wishlistSlice";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const t = useTranslations("Navbar");
    const locale = useLocale();
    const pathname = usePathname();
    const cartCount = useSelector((state: RootState) => state.cart.cart.length);
    const wishListCount = useSelector(
        (state: RootState) => state.wishList.favorite.length
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (token && userId) {
            dispatch(getUserCart({ token, userId }));
        }
        const wishlist = localStorage.getItem("wishList");
        if (wishlist) {
            const parsed = JSON.parse(wishlist);
            dispatch(loadWishlist(parsed));
        }
    }, [dispatch, token, userId]);

    return (
        <>
            <header className="w-full border-b border-gray-200 shadow-sm bg-white fixed z-20 top-0">
                <div className="container flex justify-between items-center max-md:flex-row-reverse">
                    <h1 className="text-xl font-bold">{t("exclusive")}</h1>
                    <nav aria-label="Main navigation">
                        <ul className="flex gap-12 text-sm max-md:hidden">
                            {NavLinks.slice(0, 4).map((link) => {
                                const fullPath = `/${locale}${link.path === "/" ? "" : "/" + link.path
                                    }`;
                                const isActive = pathname === fullPath;
                                return (
                                    <li
                                        key={link.id}
                                        className="hover:scale-110 transition-all duration-500"
                                    >
                                        <Link
                                            href={fullPath}
                                            aria-label={t(link.title)}
                                            className={`relative cursor-pointer
                                                    before:absolute before:left-0 before:bottom-[-5px]
                                                    before:h-0.5 before:bg-[var(--color-secondary)]
                                                    before:transition-all before:duration-300
                                                    before:content-['']
                                                    ${isActive
                                                    ? "before:w-full text-[var(--color-secondary)]"
                                                    : "before:w-0"
                                                }
                                                    `}
                                        >
                                            {t(link.title)}
                                        </Link>
                                    </li>
                                );
                            })}
                            {!token && !userId ? (
                                <li>
                                    <Link
                                        href={`/${locale}/login`}
                                        aria-label={`${t("login")}`}
                                        className={`relative cursor-pointer before:absolute before:left-0 before:bottom-[-5px] before:h-0.5 before:bg-[var(--color-secondary)]
                                                before:transition-all before:duration-300 before:content-[''] hover:scale-105 duration-300 transition-all ${pathname === `/${locale}/login`
                                                ? "before:w-full text-[var(--color-secondary)]"
                                                : "before:w-0"
                                            }`}
                                    >
                                        {t("login")}
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </nav>
                    <div className="flex gap-5 max-md:hidden items-center">
                        <div>
                            <LanguageSwitcher />
                        </div>
                        <div className="relative">
                            <Link
                                href={`/${locale}/wishList`}
                                className="hover:text-[var(--color-secondary)] transition-all duration-500"
                                aria-label="Wishlist"
                            >
                                <Heart size={22} />
                            </Link>
                            {wishListCount > 0 && (
                                <span
                                    className="absolute w-4 h-4 -top-2 -left-3 bg-[var(--color-secondary)]
                                            text-white rounded-full flex items-center justify-center text-xs"
                                >
                                    {wishListCount}
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <Link
                                href={`/${locale}/cart`}
                                className="hover:text-[var(--color-secondary)] transition-all duration-500"
                                aria-label="cart"
                            >
                                <ShoppingCart size={22} />
                            </Link>
                            {cartCount > 0 && (
                                <span
                                    className="absolute w-4 h-4 -top-2 -left-3 bg-[var(--color-secondary)]
                                            text-white rounded-full flex items-center justify-center text-xs"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {token && userId ? (
                            <Link
                                href={`/${locale}/profile`}
                                className="hover:text-[var(--color-secondary)] transition-all duration-500"
                                aria-label="profile"
                            >
                                <User size={22} />
                            </Link>
                        ) : null}
                    </div>

                    <div className="min-md:hidden flex items-center gap-5">
                        <div
                            onClick={() => setMenu(!menu)}
                            className={`transition-all duration-500 transform cursor-pointer ${menu ? "rotate-90" : "rotate-0"
                                }`}
                        >
                            {menu ? <X /> : <MenuIcon />}
                        </div>
                        <div>
                            <LanguageSwitcher />
                        </div>
                    </div>
                    <SideBar menu={menu} setMenu={setMenu} />
                </div>
            </header>
        </>
    );
};

export default Navbar;
