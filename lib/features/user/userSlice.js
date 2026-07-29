import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthModalOpen: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const savedUser = localStorage.getItem('gocart_user');
                if (savedUser) {
                    try {
                        state.user = JSON.parse(savedUser);
                    } catch (e) {
                        console.error("Failed to parse user from localStorage", e);
                    }
                }
            }
        },
        openAuthModal: (state) => {
            state.isAuthModalOpen = true;
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthModalOpen = false;
            if (typeof window !== 'undefined') {
                localStorage.setItem('gocart_user', JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.user = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('gocart_user');
            }
        },
    },
});

export const { loadUserFromStorage, openAuthModal, closeAuthModal, setUser, logout } = userSlice.actions;
export default userSlice.reducer;

