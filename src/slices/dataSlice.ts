// slices/dataSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// Определяем интерфейс для товара
interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

// Тип для состояния
interface DataState {
    Data: Product[];
    SumShoppingCart: number;
}

const initialState: DataState = {
    Data: [
        {
            id: 1,
            title: "1111",
            price: 109,
            category: "men's clothing",
            rating: {
                rate: 3.9,
                count: 120,
            },
        },
        {
            id: 2,
            title: "22222",
            price: 22,
            category: "men's clothing",
            rating: {
                rate: 4.1,
                count: 259,
            },
        },
    ],
    SumShoppingCart: 0,
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData(state, action: PayloadAction<Product[]>) {
            state.Data = action.payload;
        },
        setSum(state, action: PayloadAction<number>) {
            state.SumShoppingCart += action.payload;
        },
        delSum(state) {
            state.SumShoppingCart = 0;
        },
    },
});

// Хуки для использования в компонентах
export const useData = () => useSelector((state: { ourData: DataState }) => state.ourData.Data);
export const useSum = () => useSelector((state: { ourData: DataState }) => state.ourData.SumShoppingCart);

// Экспортируем действия
export const { setData: setDataAction, setSum: setSumAction, delSum: delSumAction } = dataSlice.actions;

export default dataSlice.reducer;
