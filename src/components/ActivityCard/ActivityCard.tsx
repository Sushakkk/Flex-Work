import React from 'react';
import { Link } from 'react-router-dom'; // Не забудьте импортировать Link
import { T_Activity } from '../../modules/types';


type ActivityCardProps = {
    activity: T_Activity; 
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => { 
    
   
    return (
        <div className="services__column" key={activity.id}>
            <div className="services__card item-services">
                <h3 className="item-service__title">{activity.title}</h3>
                <div className="item-service__img">
                    <img
                        src={activity.img_url || 'https://avatars.mds.yandex.net/i?id=284efc4987205a8f579db78365821d19_sr-8271622-images-thumbs&n=13'}
                        alt={activity.title}
                    />
                </div>
                <div className="item-service_buttons">
                    <Link 
                        to={`/activity/${activity.id}`}
                        className="item-service__button button-page"
                    >
                        Подробнее
                    </Link>
                    {/* <form method="post" action={`/activity/${activity.id}/add_activity/`}>
                        <button className="main-block__button__add" type="submit">
                            +
                        </button>
                    </form> */}
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
