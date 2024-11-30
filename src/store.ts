import userReducer from "./slices/userSlice.ts"
import activitiesReducer from './slices/activitiesSlice';
import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['id', "username", "email"]
}


const rootReducer = combineReducers({

    activities: activitiesReducer,
    user: persistReducer(persistConfig, userReducer),

});

const store = configureStore({
    reducer: rootReducer,
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
