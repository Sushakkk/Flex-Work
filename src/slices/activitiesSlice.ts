import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { T_Activity } from '../modules/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ActivitiesState {
    activities: T_Activity[];  
    filteredActivities: T_Activity[];  
    title?: string ;

}

const initialState: ActivitiesState = {
    activities: [],
    filteredActivities: [],
    title: '',
};

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setActivities(state, action: PayloadAction<T_Activity[]>) {
            state.activities = action.payload;
            const titleFilter = state.title || '';  // Если title undefined, используем пустую строку
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
            state.filteredActivities = state.activities; // После очистки фильтра показываем все активности
        },
    },
});

// Селекторы
export const selectActivities = (state: RootState) => state.activities.activities;
export const selectFilteredActivities = (state: RootState) => state.activities.filteredActivities;
export const selectTitle = (state:RootState) => state.activities.title;

export const useActivities = () => useSelector((state: RootState) => state.activities.filteredActivities);
export const useTitle = () => useSelector((state: RootState) => state.activities.title);

export const {
    setActivities,
    setTitle,
    clearTitle,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
