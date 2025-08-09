"use client";
import { RootState } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductsType } from "@/lib/types";
import { CheckCircle } from "lucide-react";
import MotionWrapper from "@/components/library/MotionWrapper";

interface Order {
    _id: string;
    shippingAddress: {
        fullName: string;
        street: string;
        city: string;
        country: string;
    };
    totalPrice: number;
    items: ProductsType[];
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const OrderSuccessPage = () => {
    const t = useTranslations("orderId");
    const l = useTranslations("products");
    const locale = useLocale();
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const token = useSelector((state: RootState) => state.auth.token);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.success) {
                    setOrder(data.data);
                } else {
                    console.error("Fetch failed:", data.message);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id && token) {
            fetchOrder();
        }
    }, [id, token]);

    if (loading) return <p>{t("loading")}</p>;
    if (!order) return <p>{t("orderNotFound")}</p>;

    return (
        <div className="mt-24 ">
            <div className="container flex gap-8 flex-wrap max-md:flex-col">
                <div className="flex-1">
                    <MotionWrapper>
                        <h1 className="text-3xl font-extrabold text-green-600 mb-6 tracking-wide flex items-center gap-3">
                            <CheckCircle className="w-7 h-7 text-green-500" />
                            {t("orderConfirmed")}
                        </h1>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-gray-700">{t("orderId")}</h3>
                            <span className="font-semibold text-sm">{order._id}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-gray-700">{t("customer")}</h3>
                            <span className="font-semibold text-sm">
                                {order.shippingAddress.fullName}
                            </span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-gray-700">{t("shipping")}</h3>
                            <span className="font-semibold text-sm">
                                {order.shippingAddress.street}, {order.shippingAddress.city},{" "}
                                {order.shippingAddress.country}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-300 pt-3">
                            <h3 className="font-semibold text-sm">{t("total")}</h3>
                            <span className="font-semibold text-sm">${order.totalPrice}</span>
                        </div>
                    </MotionWrapper>
                </div>
                <div className="w-px bg-gray-300"></div>
                <div className="flex-1">
                    <MotionWrapper>
                        <h1 className="text-2xl font-semibold mb-5">{t("items")}:</h1>
                        {order.items.map((item: ProductsType) => (
                            <div
                                key={item._id}
                                className="flex flex-col not-last-of-type:border-b border-gray-200 py-5"
                            >
                                <h2
                                    className="font-bold mb-3"
                                    aria-label={locale === "ar" ? l(item.name) : item.name}
                                >
                                    {locale === "ar" ? l(item.name) : item.name}
                                </h2>
                                <div className="flex items-center justify-between">
                                    <p className="bg-[#eee] px-2 py-0.5 text-xs font-semibold rounded-xs">
                                        x{item.quantity}
                                    </p>
                                    <p className="text-sm">${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
