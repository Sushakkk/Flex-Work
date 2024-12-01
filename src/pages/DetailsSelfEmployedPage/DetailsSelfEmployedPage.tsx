import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchSelfEmployed } from '../../slices/selfEmployedSlice';
import { Link } from 'react-router-dom';
import './DetailsSelfEmployedPage.css';

const DetailsSelfEmployedPage = () => {
  const dispatch = useAppDispatch();

  const self_employed = useAppSelector((state) => state.selfEmployed.detail_self_employed);

  console.log('self', self_employed);

  useEffect(() => {
    const userId = 4;
    dispatch(fetchSelfEmployed(String(userId)));
  }, [dispatch]);

  if (!self_employed) {
    return <div>Загрузка...</div>;
  }

  const { fio, activities } = self_employed;

  return (
    <div>
      <div className="page__basket _container">
        <div className="basket__content">
          <div className="basket__title main-block__container-details">
            <div className="basket__title-main">Самозанятый</div>
          </div>

          {self_employed && (
            <div className="basket_fio">
              <span className="basket_fio detail-label">Самозанятый:</span> {fio}
            </div>
          )}

          <div className="basket__cards">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div className="basket__row" key={activity.id}>
                  <div className="basket__card item-basket">
                    <div className="item-basket__img">
                      <img src={activity.img_url} alt={activity.title} />
                    </div>
                    <h3 className="item-basket__title">{activity.title}</h3>

                    {activity.importance && (
                      <img
                        className="basket__img"
                        src={`http://${window.location.hostname}:9000/flexwork/main_service.svg`}
                        alt="basket"
                      />
                    )}

                    <div className="item-basket__price-button">
                      <Link to={`/activity/${activity.id}`} className="item-basket__button button-page">
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Активности не найдены</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSelfEmployedPage;
