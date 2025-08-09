import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
    userId: string;
    role: string;
}

const initialState: AuthState = {
    token: "",
    userId: "",
    role: "",
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.token = "";
            state.userId = "";
        }
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
