import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";

const localStorageEngine = {
    getItem: (key: string) => {
        return Promise.resolve(localStorage.getItem(key));
    },
    setItem: (key: string, value: string) => {
        localStorage.setItem(key, value);
        return Promise.resolve();
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const rootReducer = combineReducers({
    auth: authReducer,
    products: productReducer,
});

const persistConfig = {
    key: "root",
    storage: localStorageEngine,
    whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PAUSE",
                    "persist/PURGE",
                    "persist/REGISTER",
                    "persist/FLUSH",
                ],
            },
        }),
});

export const persistor = persistStore(store);

// Fix - use rootReducer for RootState, not store.getState
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;