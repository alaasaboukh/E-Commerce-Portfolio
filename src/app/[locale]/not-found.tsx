import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white text-center">
            <div>
                <h1 className="text-7xl font-bold text-black mb-6">404 Not Found</h1>
                <p className="text-gray-700 mb-7">
                    Your visited page not found. You may go home page.
                </p>
                <Link
                    href="/"
                    className="bg-[var(--color-secondary)] hover:bg-red-700 cursor-pointer transition-all duration-500 text-white font-medium py-3 px-4 rounded"
                >
                    Back to home page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
