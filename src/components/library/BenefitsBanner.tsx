import { Truck, Headphones, ShieldCheck } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { useTranslations } from "next-intl";

const benefits = [
    {
        icon: Truck,
        title: "deliveryTitle",
        description: "deliveryDesc",
    },
    {
        icon: Headphones,
        title: "supportTitle",
        description: "supportDesc",
    },
    {
        icon: ShieldCheck,
        title: "guaranteeTitle",
        description: "guaranteeDesc",
    },
];

const BenefitsBanner = () => {
    const t = useTranslations("benefitsBanner");
    return (
        <div>
            <div className="container flex justify-evenly items-center text-center flex-wrap max-md:gap-8 mt-24">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <MotionWrapper key={index}>
                            <article className="text-center">
                                <div className="bg-black text-white mx-auto w-fit rounded-full p-3 mb-4 border-8
                                    border-gray-300 flex justify-center items-center">
                                    <Icon className="w-7 h-7" aria-hidden="true" />
                                </div>
                                <h2 className="font-bold mb-1 text-lg">{t(benefit.title)}</h2>
                                <p className="text-xs text-gray-600">
                                    {t(benefit.description)}
                                </p>
                            </article>
                        </MotionWrapper>
                    );
                })}
            </div>
        </div>
    );
};

export default BenefitsBanner;
