import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    menu: string;
    chatId: string;
}

const initialState: AppState = {
    menu: 'dashboard',
    chatId: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMenu(state, action: PayloadAction<string>) {
            state.menu = action.payload;
        },
        setChatId(state, action: PayloadAction<string>) {
            state.chatId = action.payload;
        },
    },
});

export const { setMenu, setChatId } = appSlice.actions;
export default appSlice.reducer;
