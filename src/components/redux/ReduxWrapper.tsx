"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ReduxInitializer from "@/components/redux/ReduxInitializer";

export default function ReduxWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <ReduxInitializer />
            {children}
        </Provider>
    );
}
