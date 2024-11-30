import { useEffect, FormEvent, useState } from 'react'; 
import './ActivitiesPage.css';
import { fetchActivities, setTitle, useActivities, useTitle } from '../../slices/activitiesSlice';
import { useDispatch } from 'react-redux';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppDispatch } from '../../store';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import { useActivityCount, useSelfEmployedID } from '../../slices/selfEmployedSlice';


const ActivitiesPage = () => {
    const [isMock, setIsMock] = useState(false);
  
    // const [count, setCount] = useState(0);




    const [selectedTitle, setSelectedTitle] = useState<string>(useTitle() || ''); 

    const dispatch = useAppDispatch()
    const title= useTitle() || '';
    const activities =useActivities()

    const count = useActivityCount();





    

   
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setTitle(selectedTitle));
    };
    
    const currentHost = window.location.hostname;


    useEffect(() => {
        dispatch(fetchActivities())

    }, [])
    
    // useEffect(() => {
    //     fetchData();
    // }, [title]);



    
    
    // const createMocks = () => {
    //     setIsMock(true);
    //     setActivities(ActivitiesMocks.filter(activity => activity.title.toLowerCase().includes(title.toLowerCase())));
    // }

   
   


    return (
        <main id="main" className="page">
            <Breadcrumbs/>
            <div className="page__services _container">
                <div className="services__content">
                    <div className="services__search">
                        <form onSubmit={handleSubmit}>
                            <div className="search-container">
                                <input
                                    type="text"
                                    name="activity"
                                    value={selectedTitle}
                                    onChange={(e) => setSelectedTitle(e.target.value)}
                                    placeholder="Поиск"
                                    className="search-input"
                                />
                                <button type="submit" className="search-button">
                                    <img src={`http://${currentHost}:9000/flexwork/Group.svg`} alt="Search" />
                                </button>
                            </div>
                        </form>
                        <div className="basket-container">
                            <img
                                className="basket__img"
                                src={`http://${currentHost}:9000/flexwork/basket.svg`}
                                alt="basket"
                            />
                            {count > 0 && (
                                <div className="basket_amount">{count}</div>
                            )} {/* Условный рендеринг здесь */}
                        </div>
                    </div>

                    <div className="services__cards">
                        {activities.map((activity) => (
                            <ActivityCard key={activity.id} activity={activity}/>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ActivitiesPage;