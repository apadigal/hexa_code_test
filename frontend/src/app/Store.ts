import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {ItemsReducer} from "./features/items/ItemsReducer";

export const store = configureStore({
    reducer: {
        items: ItemsReducer,
    },
});

// Typing for RootState
export type RootState = ReturnType<typeof store.getState>;

// Typing for AppDispatch to include Thunks
export type AppDispatch = typeof store.dispatch;

// Typing for Thunk Actions
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    Action<string>
>;
