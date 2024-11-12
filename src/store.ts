// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import activitiesReducer from './slices/activitiesSlice';
import selfEmployedReducer from "./slices/selfEmployedSlice";

const rootReducer = combineReducers({

    activities: activitiesReducer,
    self_employed: selfEmployedReducer,
});

const store = configureStore({
    reducer: rootReducer,
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
