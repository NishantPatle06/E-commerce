import { addressDummyData } from '@/assets/assets'
import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        list: [addressDummyData],
    },
    reducers: {
        loadAddressesFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const saved = localStorage.getItem('gocart_addresses');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            state.list = parsed;
                        }
                    } catch (e) {
                        console.error("Failed to parse addresses from localStorage", e);
                    }
                }
            }
        },
        addAddress: (state, action) => {
            state.list.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('gocart_addresses', JSON.stringify(state.list));
            }
        },
    }
});

export const { loadAddressesFromStorage, addAddress } = addressSlice.actions;

export default addressSlice.reducer;