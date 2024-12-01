import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { deleteSelfEmployed, fetchSelfEmployed, formSelfEmployed, updateSelfEmployed } from '../../slices/selfEmployedSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Input } from 'reactstrap';
import './DetailsSelfEmployedPage.css';

const DetailsSelfEmployedPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const self_employed = useAppSelector((state) => state.selfEmployed.detail_self_employed);
 

  // Инициализация состояния fio
  const [fio, setFio] = useState('');
  const [isDeleted, setIsDeleted] = useState(false); 
  const [isForm, setIsForm] = useState(false); 

  const status=  self_employed?.self_employed.status 

  
  useEffect(() => {
    
      dispatch(fetchSelfEmployed(String(id))); 
      console.log('red', self_employed)
  }, [dispatch, id, isDeleted, isForm]);


  useEffect(() => {
    if (self_employed?.self_employed?.fio) {
      setFio(self_employed.self_employed.fio);
    }
  }, [self_employed]);

  const saveFields = async (e) => {
    e.preventDefault();
  
    const data = {
      fio: fio,
    };
  
    console.log('id', id);
    await dispatch(updateSelfEmployed({ id: id, fio: data.fio }));
  };

  
  const deleteSelfEmployedHandler = async () => {
    if (id) {
      await dispatch(deleteSelfEmployed(id)); 
      setIsDeleted(true); 
      navigate("/activities")
    } else {
      console.error("ID не найден для удаления");
    }
  };



  const formSelfEmployedHandler = async () => {
    if (id) {
      await dispatch(formSelfEmployed(id)); 
      setIsForm(true);
      navigate("/activities")
    } else {
      console.error("ID не найден для удаления");
    }
  };



  
  console.log('id', id)
  if (!self_employed || id === 'null') {
    return (
      <div className='home'>
        Корзина пуста
      </div>
    );
  }

  const { activities } = self_employed;

  return (
    <main id="main" className="page">
      <div className="page__basket _container">
        <div className="basket__content">
          {/* Форма для редактирования fio */}
          <div className="basket_fio_container">
            <span className="basket_fio detail-label">Самозанятый:</span>
            <Input
              type="text"
              value={fio} 
              onChange={(e) => setFio(e.target.value)}  
              placeholder="Введите ФИО"
            />
            <button onClick={saveFields} className="button-page" type="submit">Сохранить</button>
          </div>

          {/* Данные активности */}
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

        {/* Кнопки действий для черновика */}
        {status === 'draft' && (
          <Row className="mt-5">
            <Col className="d-flex gap-5 justify-content-center">
              <Button color="primary" className="fs-4" onClick={formSelfEmployedHandler}>Сформировать</Button>
              <Button color="danger" className="fs-4" onClick={deleteSelfEmployedHandler}>Удалить</Button>
            </Col>
          </Row>
        )}

        {/* <div className="button-container">
          <button className="button-page ">
            Сформировать
          </button>
        </div> */}
      </div>
    </main>
  );
};

export default DetailsSelfEmployedPage;
