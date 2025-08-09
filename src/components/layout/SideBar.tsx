"use client";
import { NavLinks } from "@/lib/types";
import { RootState } from "@/redux/store";
import { User, UserPlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SideBar = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const locale = useLocale();
    const t = useTranslations("Navbar");
    const { token, userId } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenu(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setMenu]);

    return (
        <div
            aria-label="Sidebar navigation"
            className={`
                fixed top-[75px] ${locale === "en" ? "left-0" : "right-0"} h-screen w-[300px]
                bg-[var(--color-secondary)] text-white z-40
                transition-transform duration-1000 ease-in-out
                transform ${menu ? "translate-x-0" : `${locale === "en" ? "-translate-x-full" : "translate-x-full"}`}
            `}
        >
            <div className="flex flex-col p-6">
                <ul className="flex flex-col">
                    {NavLinks.map((link) => (
                        <li key={link.id}>
                            <Link
                                href={`/${locale}/${link.path}`}
                                aria-label={`Go to ${t(link.title)}`}
                                className="my-5 flex gap-2 items-center transition-all duration-300 hover:scale-110"
                                onClick={() => setMenu(false)}
                            >
                                <span className="inline-block">{<link.icon />}</span>
                                {t(link.title)}
                            </Link>
                        </li>
                    ))}
                    <li>
                    {token && userId ? (
                            <Link
                                href={`/${locale}/profile`}
                                aria-label="profile"
                                className="mt-3 flex gap-2 items-center hover:scale-110 transition-all duration-500"
                            >
                                <span><User size={22} /> </span>
                                {t("profile")}
                            </Link>
                        ) : null}
                    </li>
                    {!token && !userId ?
                    <li>
                        <Link href={`/${locale}/login`} aria-label={t("login")} className="py-5 flex items-center transition-all duration-300 hover:scale-110 gap-2"
                            onClick={() => setMenu(false)}>
                            <span className="inline-block "><UserPlus /></span>
                            {t("login")}
                        </Link>
                    </li> : null
                    }
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
