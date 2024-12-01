import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSelfEmployed } from '../../slices/selfEmployedSlice';
import { Link } from 'react-router-dom';
import './DetailsSelfEmployedPage.css';

const DetailsSelfEmployedPage = () => {
  const dispatch = useAppDispatch();

  const self_employed = useAppSelector((state) => state.selfEmployed.detail_self_employed);
  const self_employed_id = useAppSelector((state) => state.selfEmployed.self_employed_id);




  useEffect(() => {
    dispatch(fetchSelfEmployed(String(self_employed_id)));
  }, [dispatch]);

  if (!self_employed) {
    return <div>Загрузка...</div>;
  }



  const { activities } = self_employed;




  return (
    <main id="main" className="page">
      <div className="page__basket _container">
        <div className="basket__content">
          {/* <div className="basket__title main-block__container-details">
            <div className="basket__title-main">Самозанятый</div>
          </div> */}

          <div className="basket_fio">
            <span className="basket_fio detail-label">Самозанятый:</span> {self_employed.self_employed.fio}
          </div>

          <div className="basket__cards">
            {activities.map((activity) => (
              <div className="basket__row" key={activity.id}>
                <div className="basket__card item-basket">
                  <div className="item-basket__img">
                    <img src={activity.img_url} alt={activity.title} />
                  </div>
                  <h3 className="item-basket__title">{activity.title}</h3>

                  {activity.importance ? (
                    <img
                      className="basket__img"
                      src={`http://${window.location.hostname}:9000/flexwork/main_service.svg`}
                      alt="basket"
                    />
                  ) : (
                    <div></div>
                  )}

                  <div className="item-basket__price-button">
                    <Link to={`/activity/${activity.id}`} className="item-basket__button button-page">
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsSelfEmployedPage;
