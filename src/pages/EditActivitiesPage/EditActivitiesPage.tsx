import { useEffect, useState } from "react";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { T_SelfEmployedFilters } from "../../utils/types";

import { fetchAllSelfEmployed, updateFilters } from "../../slices/selfEmployedSlice";
import ActivitiesTable from "../../components/ActivitiesTable";
import { clearActivity, fetchActivities, setNewActivity } from "../../slices/activitiesSlice";



const EditActivitiesPage = () => {
  const dispatch = useAppDispatch();

  const activities = useAppSelector((state) => state.activities.activities);
  const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);
  const isStaff = useAppSelector((state) => state.user.is_staff);

  const filters = useAppSelector<T_SelfEmployedFilters>((state) => state.selfEmployed.filters);

  const navigate = useNavigate();

  const [status, setStatus] = useState( ""); // По умолчанию пустой статус
  const [dateFormationStart, setDateFormationStart] = useState(""); 
  const [dateFormationEnd, setDateFormationEnd] = useState( ""); 


  const handleAddClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setNewActivity(true))


      navigate('/edit-activity/null');
  };

  const statusOptions = {
    "": "Любой", 
    active: "Активна",
    deleted: "Удалена",
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/403/");
    }
  }, [isAuthenticated, navigate]);


useEffect(()=>{
  if (!isStaff) {
    navigate('/404')
  }
  dispatch(fetchActivities())
  dispatch(clearActivity())
},[])



  // Эффект для загрузки данных самозанятых при изменении фильтров
  useEffect(() => {
    // Обновляем фильтры в хранилище
    const updatedFilters: T_SelfEmployedFilters = {
      status: status || "", 
      start_date: dateFormationStart || "", 
      end_date: dateFormationEnd || "", 
    };
    
    dispatch(updateFilters(updatedFilters)); // Обновляем фильтры в состоянии
    dispatch(fetchAllSelfEmployed()); // Загружаем данные с примененными фильтрами
  }, [status, dateFormationStart, dateFormationEnd, dispatch]);

  return (
    <main id="main" className="page">
      <div className="page__services _container">
        <Container>
          {/* <Form>
            <Row className="mb-4 d-flex align-items-center">
              <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                <label>От</label>
                <Input
                  type="date"
                  value={dateFormationStart}
                  onChange={(e) => setDateFormationStart(e.target.value)} // Обновляем дату начала
                />
              </Col>
              <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                <label>До</label>
                <Input
                  type="date"
                  value={dateFormationEnd}
                  onChange={(e) => setDateFormationEnd(e.target.value)} // Обновляем дату окончания
                />
              </Col>
              <Col md="3">
                <CustomDropdown
                  label="Статус"
                  selectedItem={status}
                  setSelectedItem={setStatus} // Обновляем статус
                  options={statusOptions}
                />
              </Col>
            </Row>
          </Form> */}

          {activities.length ? (
            <ActivitiesTable activities={activities} />
          ) : (
            <h3 className="text-center mt-5">Самозанятые не найдены</h3>
          )}

<Row className="mt-5">
            <Col className="d-flex gap-5 justify-content-center">
              <button  className="button-page grey" onClick={handleAddClick}>Добавить</button>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
};

export default EditActivitiesPage;