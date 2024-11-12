import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { T_Activity } from '../modules/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ActivitiesState {
    title?: string ;

}

const initialState: ActivitiesState = {
    title: '',
};

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
});


export const useTitle = () => useSelector((state: RootState) => state.activities.title);



export const {
    setTitle,
    clearTitle,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
