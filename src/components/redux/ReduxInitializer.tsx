"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/authSlice";

export default function ReduxInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (token && userId && role) {
            dispatch(setAuth({ token, userId, role }));
        }
    }, [dispatch]);

    return null;
}
