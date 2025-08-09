"use client";

import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getUserCart } from "@/redux/cartSlice";
import { useLocale, useTranslations } from "next-intl";
import MotionWrapper from "@/components/library/MotionWrapper";
import FormOrder from "@/components/order/FormOrder";
import PaymentOrder from "@/components/order/PaymentOrder";

const Page = () => {
    const t = useTranslations("Orders");
    const l = useTranslations("products");
    const locale = useLocale();
    const dispatch = useDispatch<AppDispatch>();
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const getLocalized = (text: string) => (locale === "ar" ? l(text) : text);

    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    useEffect(() => {
        if (token && userId) {
            dispatch(getUserCart({ token, userId }));
        }
    }, [dispatch, token, userId]);

    return (
        <div className="mt-28" aria-label="Cart Summary">
            <MotionWrapper>
                <h1 className="container text-2xl font-bold mb-3 tracking-wide">
                    {t("billingDetails")}
                </h1>
            </MotionWrapper>
            <div className="container flex max-md:flex-col flex-wrap gap-8">
                <div className="flex-[1]">
                    <FormOrder formData={formData} setFormData={setFormData} />
                </div>
                <div className="flex-[1] p-5">
                    <MotionWrapper>
                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-between items-center mb-4"
                            >
                                <div className="flex gap-3 items-center">
                                    <Image
                                        src={item.productId?.images?.[0]}
                                        alt={`Product image of ${locale === "ar" ? l(item.name) : item.name
                                            }`}
                                        loading="lazy"
                                        width={50}
                                        height={50}
                                    />
                                    <h2 className="text-sm" aria-label={getLocalized(item.name)}>
                                        {getLocalized(item.name)}
                                    </h2>
                                </div>
                                <p className="text-sm">${item.price}</p>
                            </div>
                        ))}
                        <div className="flex flex-col gap-3 mb-5">
                            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                                <h2 className="text-sm">{t("subtotal")}:</h2>
                                <p className="text-sm">${totalPrice}</p>
                            </div>
                            <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                                <h2 className="text-sm">{t("shipping")}:</h2>
                                <p className="text-sm">Free</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h2 className="text-sm">{t("total")}:</h2>
                                <p className="text-sm">${totalPrice}</p>
                            </div>
                        </div>
                        <PaymentOrder formData={formData} />
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
};

export default Page;
