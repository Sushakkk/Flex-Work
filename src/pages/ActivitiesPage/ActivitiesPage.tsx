import {FormEvent, useState, useEffect } from 'react'; 
import './ActivitiesPage.css';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import basket from '../../assets/images/basket.svg';
import loupe from '../../assets/images/Group.svg';
import { GetActivities } from '../../getData';
import { setTitle, useActivities, useCount, useTitle } from '../../slices/activitiesSlice';
import { useDispatch } from 'react-redux';

const ActivitiesPage = () => {

    const [selectedTitle, setSelectedTitle] = useState<string>(useTitle() || ''); 

    const dispatch = useDispatch();

    const activities = useActivities();
    const count = useCount()


    GetActivities()
  
  


    
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setTitle(selectedTitle));
    };
    

   

    return (
        <main id="main" className="page">
            <Breadcrumbs /> 
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
                                    <img src={loupe || "http://127.0.0.1:9000/flexwork/Group.svg"} alt="Search" />
                                </button>
                            </div>
                        </form>
                        <div className="basket-container">
                            <img
                                className="basket__img"
                                src={basket || "http://127.0.0.1:9000/flexwork/basket.svg"}
                                alt="basket"
                            />
                            {count > 0 && (
                                <div className="basket_amount">{count}</div>
                            )}
                        </div>
                    </div>

                    <div className="services__cards">
                        {activities.map((activity) => (
                            <ActivityCard key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ActivitiesPage;

