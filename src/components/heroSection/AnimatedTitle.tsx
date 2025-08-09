"use client";
import { motion } from "framer-motion";


const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.3,
            duration: 0.5,
        },
    }),
};

const isArabic = (text: string) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
};

const AnimatedTitle = ({ text, id }: { text: string, id?: string }) => {
    const isTextArabic = isArabic(text);
    const parts = isTextArabic ? text.split(" ") : text.split("");

    return (
        <h1 className="text-5xl font-bold mb-5 text-[var(--color-secondary)] bg-clip-text max-md:text-2xl flex flex-wrap gap-1" id={id}>
            {parts.map((part, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={letterAnimation}
                    className="inline-block"
                >
                    {part === " " ? "\u00A0" : part}
                </motion.span>
            ))}
        </h1>
    );
};

export default AnimatedTitle;