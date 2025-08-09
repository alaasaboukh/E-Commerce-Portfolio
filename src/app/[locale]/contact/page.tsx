"use client";

import MotionWrapper from "@/components/library/MotionWrapper";
import { Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
    const t = useTranslations("contact");
    const l = useTranslations("Orders");
    const locale = useLocale();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="my-30">
            <div className="container flex flex-wrap max-sm:flex-col max-md:gap-6 max-md:text-center">
                <div className="flex-[2]">
                    <MotionWrapper>
                        <div className="mb-10">
                            <div className="flex items-center mb-5 max-md:justify-center gap-3">
                                <div className="bg-[var(--color-secondary)] text-white p-2 rounded-full">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="font-semibold">{t("callToUs")}</span>
                            </div>
                            <h4 className="mb-3 text-sm">{t("available")}</h4>
                            <h3 className="text-sm">{t("phone")}: 01278900285</h3>
                        </div>
                        <div className="">
                            <div className="flex items-center mb-5 max-md:justify-center gap-3">
                                <div className="bg-[var(--color-secondary)] text-white p-2 rounded-full ">
                                    <Mail className=" w-5 h-5" />
                                </div>
                                <span className="font-semibold">{t("emailUs")}</span>
                            </div>
                            <h4 className="mb-3 text-sm">{t("contactWithin")}</h4>
                            <h4 className="mb-3 text-sm">
                                {t("emails")}: alaasaboukh9@gmail.com
                            </h4>
                            <h3 className="text-sm">{t("emails")}: alaasaboukh1@gmail.com</h3>
                        </div>
                    </MotionWrapper>
                </div>
                <div className="flex-[3]">
                    <MotionWrapper>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (
                                    !formData.name ||
                                    !formData.email ||
                                    !formData.phone ||
                                    !formData.message
                                ) {
                                    toast.error(l("fill_all_fields"));
                                    return;
                                }
                                toast.success(t("message"));
                                setFormData({
                                    name: "",
                                    email: "",
                                    phone: "",
                                    message: "",
                                });
                            }}
                        >
                            <div className="flex gap-4 mb-5 flex-wrap w-full">
                                <input
                                    value={formData.name}
                                    onChange={handleChange}
                                    name="name"
                                    placeholder={t("yourName")}
                                    className="flex-1 bg-[#F5F5F5] rounded p-3 outline-none placeholder:text-sm"
                                />
                                <input
                                    value={formData.email}
                                    onChange={handleChange}
                                    name="email"
                                    placeholder={t("yourEmail")}
                                    className="flex-1 bg-[#F5F5F5] rounded p-3 outline-none placeholder:text-sm"
                                />
                                <input
                                    value={formData.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    placeholder={t("yourPhone")}
                                    className={` outline-none bg-[#f5f5f5] rounded p-3 flex-1 placeholder:text-sm ${locale === "ar" ? "text-right" : "text-left" 
                                        }`}
                                />
                            </div>
                            <textarea
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                name="message"
                                placeholder={t("yourMessage")}
                                className="w-full bg-[#F5F5F5] p-3 rounded outline-none resize-none mb-4 placeholder:text-sm"
                            ></textarea>

                            <button
                                type="submit"
                                className="ml-auto block bg-[var(--color-secondary)] text-white py-2 px-6 rounded hover:bg-red-700 transition-all duration-500 cursor-pointer"
                            >
                                {t("sendMessage")}
                            </button>
                        </form>
                    </MotionWrapper>
                </div>
            </div>
        </div>
    );
};

export default Page;
