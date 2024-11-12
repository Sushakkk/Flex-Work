import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { T_Activity } from '../modules/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ActivitiesState {
    activities: T_Activity[];  
    filteredActivities: T_Activity[];  
    title?: string ;
    count: number;

}

const initialState: ActivitiesState = {
    activities: [],
    filteredActivities: [],
    title: '',
    count: 0,
};

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setActivities(state, action: PayloadAction<T_Activity[]>) {
            state.activities = action.payload;
            const titleFilter = state.title || '';  
            state.filteredActivities = state.activities.filter(activity =>
                activity.title.toLowerCase().includes(titleFilter.toLowerCase())
            );
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
            state.filteredActivities = state.activities.filter(activity =>
                activity.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
        clearTitle(state) {
            state.title = '';
            state.filteredActivities = state.activities; 
        },

        setCount(state, action: PayloadAction<number>){
            state.count=action.payload
        }
    },
});

// Селекторы
export const selectActivities = (state: RootState) => state.activities.activities;
export const selectFilteredActivities = (state: RootState) => state.activities.filteredActivities;
export const selectTitle = (state:RootState) => state.activities.title;

export const useActivities = () => useSelector((state: RootState) => state.activities.filteredActivities);
export const useTitle = () => useSelector((state: RootState) => state.activities.title);
export const useCount  = () => useSelector((state: RootState) => state.activities.count);


export const {
    setActivities,
    setTitle,
    clearTitle,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
