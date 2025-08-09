"use client";

import { getCategory } from "@/redux/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocale, useTranslations } from "next-intl";
import UpdateCategories from "./UpdateCategories";

type CategoriesProps = {
    onCategorySelect: (id: string | null) => void;
    selectedCategory: string | null;
};

const Categories = ({
    onCategorySelect,
    selectedCategory,
}: CategoriesProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const categories = useSelector((state: RootState) => state.category.category);
    const t = useTranslations("categories");
    const locale = useLocale();
    const role = useSelector((state: RootState) => state.auth.role);

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);

    const handleClick = (id: string) => {
        onCategorySelect(id);
    };

    return (
        <div className="flex gap-2 flex-wrap my-5">
            <button
                className={`w-28 h-10 rounded cursor-pointer ${selectedCategory === ""
                        ? "bg-[var(--color-secondary)] text-white"
                        : "bg-gray-200"
                    }`}
                role="group"
                aria-label="categort filter"
                onClick={() => handleClick("")}
            >
                {t("All")}
            </button>

            {categories.map((cat) => (
                <div key={cat._id}>
                    <button
                        className={`w-28 h-10 rounded text-sm cursor-pointer ${selectedCategory === cat._id
                                ? "bg-[var(--color-secondary)] text-white"
                                : "bg-gray-200"
                            }`}
                        aria-pressed={selectedCategory === cat._id}
                        onClick={() => handleClick(cat._id)}
                    >
                        {locale === "ar" ? t(cat.name) : cat.name}
                    </button>
                    {role === "admin" && <UpdateCategories cat={cat} />}
                </div>
            ))}
        </div>
    );
};

export default Categories;
