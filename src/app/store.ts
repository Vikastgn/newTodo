import {appReducer, appSlice} from "./appSlice"
import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {baseApi} from "app/baseApi";

// непосредственно создаём store

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [appSlice.name]: appReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})
// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch


