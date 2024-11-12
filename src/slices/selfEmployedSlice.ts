import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';


interface SelfEmployed {
    id: number;
    fio: string;
    inn: string;
    created_date: string;
    modification_date: string;
    completion_date: string | null;
    status: 'draft' | 'deleted' | 'formed' | 'completed' | 'rejected';
}

interface Filters {
    status?: 'formed' | 'completed' | 'rejected';
    startDate?: string;
    endDate?: string;
}

interface SelfEmployedState {
    selfEmployedData: SelfEmployed[];
    filters: Filters;
    loading: boolean;
    error: string | null;
}

const initialState: SelfEmployedState = {
    selfEmployedData: [],
    filters: {},
    loading: false,
    error: null,
};

const selfEmployedSlice = createSlice({
    name: 'selfEmployed',
    initialState,
    reducers: {
        setSelfEmployedData(state, action: PayloadAction<SelfEmployed[]>) {
            const filteredData = filterData(action.payload, state.filters);  // Фильтруем данные перед сохранением
            state.selfEmployedData = filteredData;
          },
        setFilters(state, action: PayloadAction<Filters>) {
            state.filters = action.payload;
        },
        clearFilters(state) {
            state.filters = {};
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});






// Функция для фильтрации данных
const filterData = (data: SelfEmployed[], filters: Filters): SelfEmployed[] => {
    return data.filter((item) => {
      const statusMatch = filters.status ? item.status === filters.status : true;
      const startDateMatch = filters.startDate ? new Date(item.created_date) >= new Date(filters.startDate) : true;
      const endDateMatch = filters.endDate ? new Date(item.created_date) <= new Date(filters.endDate) : true;
      return statusMatch && startDateMatch && endDateMatch;
    });
  };




  // Хуки для использования внутри компонента
export const useSelfEmployedData = () => {
    return useSelector((state: { ourData: SelfEmployedState }) => state.ourData.selfEmployedData);
};

  

export const useFilters = () => {
    return useSelector((state: { ourData: SelfEmployedState }) => state.ourData.filters);
};

export const useSetSelfEmployedData = () => {
    const dispatch = useDispatch();
    return (data: SelfEmployed[]) => dispatch(setSelfEmployedData(data));
};

export const useSetFilters = () => {
    const dispatch = useDispatch();
    return (filters: Filters) => dispatch(setFilters(filters));
};

export const useClearFilters = () => {
    const dispatch = useDispatch();
    return () => dispatch(clearFilters());
};

export const useSetLoading = () => {
    const dispatch = useDispatch();
    return (loading: boolean) => dispatch(setLoading(loading));
};

export const useSetError = () => {
    const dispatch = useDispatch();
    return (error: string | null) => dispatch(setError(error));
};



export const { setSelfEmployedData, setFilters, clearFilters, setLoading, setError } = selfEmployedSlice.actions;
export default selfEmployedSlice.reducer;
