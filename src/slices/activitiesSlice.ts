import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { T_Activity } from '../modules/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


interface ActivitiesState {
    activities: T_Activity[];  
    filteredActivities: T_Activity[];  
    title: string;
    count: number;
    loading: boolean; // Состояние загрузки
    error: string | null; // Ошибка при запросе данных
}

const initialState: ActivitiesState = {
    activities: [],
    filteredActivities: [],
    title: '',
    count: 0,
    loading: false,
    error: null,
};

const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setActivities(state, action: PayloadAction<T_Activity[]>) {
            state.activities = action.payload;
            state.filteredActivities = filterActivities(state.activities, state.title);
        },
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
            state.filteredActivities = filterActivities(state.activities, action.payload);
        },
        clearTitle(state) {
            state.title = '';
            state.filteredActivities = state.activities;
        },
        setCount(state, action: PayloadAction<number>) {
            state.count = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    },
});

const filterActivities = (activities: T_Activity[], title: string): T_Activity[] => {
    if (!title) {
        return activities;
    }
    return activities.filter(activity =>
        activity.title.toLowerCase().includes(title.toLowerCase())
    );
};

// Селекторы
export const selectActivities = (state: RootState) => state.activities.activities;
export const selectFilteredActivities = (state: RootState) => state.activities.filteredActivities;
export const selectTitle = (state: RootState) => state.activities.title;
export const selectCount = (state: RootState) => state.activities.count;
export const selectLoading = (state: RootState) => state.activities.loading;
export const selectError = (state: RootState) => state.activities.error;

export const useActivities = () => useSelector((state: RootState) => state.activities.filteredActivities);
export const useTitle = () => useSelector((state: RootState) => state.activities.title);
export const useCount = () => useSelector((state: RootState) => state.activities.count);
export const useLoading = () => useSelector((state: RootState) => state.activities.loading);
export const useError = () => useSelector((state: RootState) => state.activities.error);

// Экшены слайса
export const {
    setActivities,
    setTitle,
    clearTitle,
    setCount,
    setLoading,
    setError,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;