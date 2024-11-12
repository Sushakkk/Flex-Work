// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import activitiesReducer from './slices/activitiesSlice';


const rootReducer = combineReducers({

    activities: activitiesReducer,

});

const store = configureStore({
    reducer: rootReducer,
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
