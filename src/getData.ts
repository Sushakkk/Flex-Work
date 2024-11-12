// getData.ts
import { useEffect } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { AppDispatch } from "./store";
import { setSelfEmployedData, useFilters } from "./slices/selfEmployedSlice";
import { setActivities, useTitle } from "./slices/activitiesSlice";
import { ActivitiesMocks } from "./modules/mocks";



export function GetSelfEmployed() {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useFilters();

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/self-employed/', {
                params: {
                
                    status: filters.status, 
                    start_date: filters.startDate,
                    end_date: filters.endDate
                },
                timeout: 1000, 
            });

            dispatch(setSelfEmployedData(response.data.self_employed));
        } catch (error) {
            console.error("Error fetching self-employed data:", error);

        }
    };

    useEffect(() => {
        fetchData();
    }, []); 
}







export function GetActivities() {
    const dispatch = useDispatch();
    const title = useTitle();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/activities/`, {
                params: {
                    title: title,
                },
                timeout: 1000, 
            });
            dispatch(setActivities(response.data.activities)); 
            
        } catch  {
            dispatch(setActivities(ActivitiesMocks)); 

        }
    };

    useEffect(() => {
        fetchData();  
    }, [title]);  
    
}


    
