// getData.ts
import { useEffect } from "react";
import axios from "axios";
import { setDataAction } from "./slices/dataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";

export function GetData() {
    const dispatch = useDispatch<AppDispatch>();

    async function fetchData() {
        const response = await axios.get('https://fakestoreapi.com/products?limit=5');
        dispatch(setDataAction(response.data));
    }

    useEffect(() => {
        fetchData();
    }, []);
}
