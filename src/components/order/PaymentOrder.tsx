import { CreateOrder } from "@/redux/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type PaymentProps = {
    formData: {
        fullName: string;
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
};

const PaymentOrder: React.FC<PaymentProps> = ({ formData }) => {
    const { token, userId } = useSelector((state: RootState) => state.auth);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const t = useTranslations("Orders");
    const router = useRouter();
    const [PaymentMethod, SetPaymentMethod] = useState("cash");
    const dispatch = useDispatch<AppDispatch>();

    const handlePlaceOrder = async () => {
        const validItems = cart
            .filter((c) => c.productId && c.productId._id)
            .map((c) => ({
                productId: c.productId._id,
                name: c.name,
                price: c.price,
                quantity: c.quantity,
            }));

        if (validItems.length === 0) {
            toast.error(t("notcomplete"));
            return;
        }

        const totalPrice = cart.reduce(
            (acc, curr) => acc + curr.price * curr.quantity,
            0
        );

        const orderPayload = {
            userId,
            items: validItems,
            totalPrice,
            shippingAddress: {
                fullName: formData.fullName,
                street: formData.street,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country,
            },
        };
        if (
            !formData.city ||
            !formData.country ||
            !formData.fullName ||
            !formData.postalCode ||
            !formData.street
        ) {
            toast.error(t("fill_all_fields"));
            return;
        }

        try {
            const res = await dispatch(CreateOrder({ token, orderPayload })).unwrap();
            router.push(`/checkout/${res._id}`);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(String(error));
            }
        }
    };
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <input
                        type="radio"
                        name="payment"
                        id="bank"
                        className="accent-red-500 cursor-pointer"
                        onChange={() => SetPaymentMethod("bank")}
                    />
                    <label htmlFor="bank" className="text-sm cursor-pointer">
                        {t("bank")}
                    </label>
                </div>
                <div className="flex gap-2">
                    {["visa2.png", "visa3.png", "mastercard.png", "visa1.png"].map(
                        (src) => (
                            <Image
                                key={src}
                                src={`/images/${src}`}
                                alt="Visa logo"
                                width={45}
                                height={45}
                                loading="lazy"
                                className="object-contain"
                            />
                        )
                    )}
                </div>
            </div>
            {PaymentMethod === "bank" && (
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder={t("bankName")}
                        className="w-full p-2 rounded bg-[#f5f5f5] outline-none placeholder:text-sm"
                    />
                    <input
                        type="text"
                        placeholder={t("accountNumber")}
                        className="w-full p-2 rounded bg-[#f5f5f5] outline-none placeholder:text-sm"
                    />
                    <input
                        type="text"
                        placeholder={t("accountHolderName")}
                        className="w-full p-2 rounded bg-[#f5f5f5] outline-none placeholder:text-sm"
                    />
                    <input
                        type="text"
                        placeholder={t("branchName")}
                        className="w-full p-2 rounded bg-[#f5f5f5] outline-none placeholder:text-sm"
                    />
                </div>
            )}
            <div className="flex gap-1 items-center">
                <input
                    type="radio"
                    name="payment"
                    id="cash"
                    className="accent-red-500 cursor-pointer"
                    onChange={() => SetPaymentMethod("cash")}
                />
                <label htmlFor="cash" className="text-sm cursor-pointer">
                    {t("cashOnDelivery")}
                </label>
            </div>
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    id="save"
                    className="w-full rounded p-2 outline-none border border-gray-300 bg-[#f5f5f5] placeholder:text-sm"
                    placeholder={t("couponCode")}
                />
                <label
                    htmlFor="save"
                    className="bg-[var(--color-secondary)] text-white text-center w-full p-2 rounded cursor-pointer hover:bg-red-700 transition-all duration-500"
                >
                    {t("applyCoupon")}
                </label>
            </div>
            <div>
                <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-2 bg-[var(--color-secondary)] text-white rounded cursor-pointer hover:bg-red-700 transition-all duration-500"
                >
                    {t("placeOrder")}
                </button>
            </div>
        </div>
    );
};

export default PaymentOrder;
