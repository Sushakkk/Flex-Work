import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { T_Activity, T_ActivitiesListResponse } from '../utils/types';
import { RootState } from '../store'; // Импортируйте RootState из вашего store
import { useSelector } from 'react-redux';
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { saveSelfEmployed } from './selfEmployedSlice';



interface T_ActivitiesSlice {
    activities: T_Activity[];
    selectedActivity: null | T_Activity
    title?: string;
}

const initialState: T_ActivitiesSlice = {
    activities: [],
    title: '',
    selectedActivity: null
};



export const fetchActivities = createAsyncThunk<T_Activity[], void, { state: RootState }>(
    'fetch_activities',
    async function (_, thunkAPI) {
        const state = thunkAPI.getState();
        console.log("Current state:", state); 

        try {
            const response = await api.activities.activitiesList({
                title: state.activities.title,
            }) as  AxiosResponse<T_ActivitiesListResponse>;

            


            thunkAPI.dispatch(saveSelfEmployed({
                self_employed_id: response.data.self_employed_id,
                activity_count: response.data.activity_count
            }))

            console.log("Response data:", response.data); 
            return response.data.activities;  
        } catch (error) {
            console.error("Error in fetchActivities:", error); 
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const fetchActivity = createAsyncThunk<T_Activity, string, AsyncThunkConfig>(
    "fetch_activity",
    async (id, thunkAPI) => {
        try {
            const response: AxiosResponse<T_Activity | void> = await api.activities.activitiesRead(id);
            return response.data as T_Activity;  
        } catch (error) {
            console.error('Error fetching activity:', error);
            return thunkAPI.rejectWithValue("Activity not found");
        }
    }
)


export const AddToSelfEmployed = createAsyncThunk<void, string, AsyncThunkConfig>(
    "activities/add_activity_to_self-employed",
    async function(id) {
        await api.activities.activitiesAddToSelfEmployedCreate(id)
    }
)



const activitiesSlice = createSlice({
    name: 'activities',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        clearTitle(state) {
            state.title = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActivities.fulfilled, (state:T_ActivitiesSlice, action: PayloadAction<T_Activity[]>) => {
            state.activities = action.payload
        });
        builder.addCase(fetchActivity.fulfilled, (state:T_ActivitiesSlice, action: PayloadAction<T_Activity>) => {
            state.selectedActivity = action.payload
        });
    }
});

export const useTitle = () => useSelector((state: RootState) => state.activities.title);
export const useActivities= () => useSelector((state: RootState) => state.activities.activities);
export const useActivity= () => useSelector((state: RootState) => state.activities.selectedActivity);

export const {
    setTitle,
    clearTitle,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
