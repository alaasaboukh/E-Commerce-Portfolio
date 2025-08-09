import BenefitsBanner from "@/components/library/BenefitsBanner";
import MotionWrapper from "@/components/library/MotionWrapper";
import ProductSlider from "@/components/library/ProductSlider";
import { Banknote, DollarSign, ShoppingBag, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const stats = [
    {
        id: 1,
        icon: <Store className="w-7 h-7" />,
        value: "10.5k",
        label: "sellers",
    },
    {
        id: 2,
        icon: <DollarSign className="w-7 h-7" />,
        value: "33k",
        label: "monthlySales",
    },
    {
        id: 3,
        icon: <ShoppingBag className="w-7 h-7" />,
        value: "45.5k",
        label: "customers",
    },
    {
        id: 4,
        icon: <Banknote className="w-7 h-7" />,
        value: "25k",
        label: "annualGross",
    },
];

const About = () => {
    const t = useTranslations("about");
    return (
        <div className="mt-30">
            <div className="container">
                <div className="flex items-center gap-5 flex-wrap max-md:flex-col">
                    <div className="flex-[1]">
                        <MotionWrapper>
                            <h1 className="font-bold text-5xl mb-5 max-md:text-3xl">
                                {t("title")}
                            </h1>
                            <p className="mb-3">{t("paragraph1")}</p>
                            <p>{t("paragraph2")}</p>
                        </MotionWrapper>
                    </div>
                    <div className="flex-[1]">
                        <MotionWrapper>
                            <Image
                                src="/images/aboutt.jpg"
                                alt="Company Overview"
                                width={800}
                                height={800}
                                className="obect-cover rounded"
                                loading="lazy"
                            />
                        </MotionWrapper>
                    </div>
                </div>
                <MotionWrapper>
                    <div className="mt-30 flex flex-wrap gap-5 justify-evenly">
                        {stats.map((stat) => (
                            <MotionWrapper key={stat.id}>
                                <div className="flex flex-col gap-2 border-2 rounded border-[#ddd] text-center w-[250px] h-[175px] p-4">
                                    <div className="bg-black text-white mx-auto rounded-full p-2 mb-3 border-8 border-gray-300">
                                        {stat.icon}
                                    </div>
                                    <h1 className="text-2xl font-bold">{stat.value}</h1>
                                    <p className="text-sm">{t(stat.label)}</p>
                                </div>
                            </MotionWrapper>
                        ))}
                    </div>
                </MotionWrapper>
                <ProductSlider />
                <BenefitsBanner />
            </div>
        </div>
    );
};

export default About;
