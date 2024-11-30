
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { RootState } from '../store'; // Импортируйте RootState из вашего store
import { useSelector } from 'react-redux';
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { T_Activity, T_SelfEmployedFilters } from '../utils/types';
import { NEXT_YEAR, PREV_YEAR } from '../utils/consts';




interface T_SelfEmployedSlice {
    self_employed_id: number | null,
    activity_count: number, 
    activity: T_Activity | null,
    activities: T_Activity[],

    filters: T_SelfEmployedFilters,
    // save_mm: boolean


}

const initialState: T_SelfEmployedSlice = {
    self_employed_id: null,
    activity_count: 0, 
    activity: null,
    activities: [],
    filters: {
        status: 'draft',
        start_date: PREV_YEAR.toISOString().split('T')[0],
        end_date: NEXT_YEAR.toISOString().split('T')[0]
    },


    // save_mm: false
};




const SelfEmployedSlice = createSlice({
    name: 'self_employed',
    initialState: initialState,
    reducers: {
        saveSelfEmployed: (state, action) => {
            console.log("Saving self-employed data", action.payload); // Логируем данные
            state.self_employed_id = action.payload.self_employed_id;
            state.activity_count = action.payload.activity_count;
        }
    }
});



export const useSelfEmployedID= () => useSelector((state: RootState) => state.selfEmployed.self_employed_id);
export const useActivityCount= () => useSelector((state: RootState) => state.selfEmployed.activity_count);

export const { saveSelfEmployed } = SelfEmployedSlice.actions;

export default SelfEmployedSlice.reducer