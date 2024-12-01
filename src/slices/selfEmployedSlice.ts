import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { api } from '../api';
import { RootState } from '../store';
import { T_SelfEmployed, T_SelfEmployedFilters } from '../utils/types';
import { NEXT_YEAR, PREV_YEAR } from '../utils/consts';
import { useSelector } from 'react-redux';

interface T_SelfEmployedSlice {
    self_employed_id: number | null;
    activity_count: number;
    detail_self_employed: T_SelfEmployed | null;
    self_employed: T_SelfEmployed[];
    filters: T_SelfEmployedFilters;
}

const initialState: T_SelfEmployedSlice = {
    self_employed_id: null,
    detail_self_employed: null,
    activity_count: 0,
    self_employed: [],
    filters: {
        status: 'draft',
        start_date: PREV_YEAR.toISOString().split('T')[0],
        end_date: NEXT_YEAR.toISOString().split('T')[0]
    },
};

export const fetchSelfEmployed = createAsyncThunk<T_SelfEmployed, string>(
    'self-employed/id',
    async (self_employed_id) => {
        const response = await api.selfEmployed.selfEmployedRead(self_employed_id) as AxiosResponse<T_SelfEmployed>;
        console.log('self-metod', response.data);
        return response.data;
    }
);

const SelfEmployedSlice = createSlice({
    name: 'self_employed',
    initialState,
    reducers: {
        saveSelfEmployed: (state, action) => {
            console.log('Saving self-employed data', action.payload); // Логируем данные
            state.self_employed_id = action.payload.self_employed_id;
            state.activity_count = action.payload.activity_count;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSelfEmployed.fulfilled, (state, action: PayloadAction<T_SelfEmployed>) => {
            state.detail_self_employed = action.payload;
        });
    },
});

export const useSelfEmployedID = () => useSelector((state: RootState) => state.selfEmployed.self_employed_id);
export const useActivityCount = () => useSelector((state: RootState) => state.selfEmployed.activity_count);

export const { saveSelfEmployed } = SelfEmployedSlice.actions;

export default SelfEmployedSlice.reducer;
