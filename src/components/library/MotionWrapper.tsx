"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 25 }} // ✅ تخفيف الحركة الرأسية
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }} // ✅ أسرع + حركة ناعمة
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
