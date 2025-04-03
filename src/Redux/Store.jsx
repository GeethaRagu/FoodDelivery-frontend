import { combineReducers ,configureStore } from "@reduxjs/toolkit";
import fooditemReducer from "./Slice/FoodSlice";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "./Slice/UserSlice";

const rootReducer = combineReducers({
    fooditem:fooditemReducer,
    user:userReducer
})
const persistConfig = {
    key:"root",
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store);