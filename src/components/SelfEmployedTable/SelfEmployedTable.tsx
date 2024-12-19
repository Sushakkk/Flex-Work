import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useAppDispatch } from "../../store";  // Подключаем dispatch
import CustomTable from "../CustomTable";
import { formatDate } from "../../utils/utils";
import { T_SelfEmployed } from "../../utils/types";
import { updateByModeratorHandler } from "../../slices/selfEmployedSlice";

interface SelfEmployedTableProps {
  all_self_employed: T_SelfEmployed[];
}

const SelfEmployedTable: React.FC<SelfEmployedTableProps> = ({ all_self_employed }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();  // Используем dispatch из Redux

  const handleClick = (self_employed_id: number): void => {
    navigate(`/self-employed/${self_employed_id}`);
  };

  const statuses: Record<string, string> = {
    draft: "Черновик",
    deleted: "Удалена",
    formed: "Сформирована",
    completed: "Завершена",
    rejected: "Отклонена",
  };

  const ModeratorHandler = async (status: string, id: number) => {
    if (id) {
      dispatch(updateByModeratorHandler({ id: id, status: status }));
      navigate('/self-employed');
    } else {
      console.error('ID не найден');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "№",
        accessor: "id", // используем id как уникальный идентификатор
      },
      {
        Header: "Пользователь",
        accessor: "user_username", // статус
        Cell: ({ value }: { value: string }) => statuses[value] || value, // преобразование статуса
      },
      {
        Header: "Статус",
        accessor: "status", // статус
        Cell: ({ value }: { value: string }) => statuses[value] || value, // преобразование статуса
      },
      {
        Header: "Дата создания",
        accessor: "created_date", // поле для даты создания
        Cell: ({ value }: { value: string }) => formatDate(value), // форматируем дату
      },
      {
        Header: "Дата завершения",
        accessor: "completion_date", // поле для даты завершения
        Cell: ({ value }: { value: string }) => value ? formatDate(value) : "--",
      },
      {
        Header: "ИНН",
        accessor: "inn", // поле для ИНН
        Cell: ({ value }: { value: string }) => value || "", // выводим ИНН или пустую строку
      },
      {
        Header: "Завершить", // Новый столбец с кнопками
        id: "actions-completed", // Уникальный id для столбца с действием "Завершить"
        Cell: ({ row }: { row: any }) => {
          const { id, status } = row.original; // Получаем id и status из строки
          console.log('status in "Завершить" button:', status); // Проверка значения статуса
          return (
            <button 
              onClick={() => ModeratorHandler('completed', id)} 
              className="button-page-s green"
              disabled={status === "completed" || status === "rejected"} // Кнопка будет задизейблена, если заявка завершена или отклонена
            >
              Завершить
            </button>
          );
        },
      },
      {
        Header: "Отклонить", // Новый столбец с кнопками
        id: "actions-rejected", // Уникальный id для столбца с действием "Отклонить"
        Cell: ({ row }: { row: any }) => {
          const { id, status } = row.original; // Получаем id и status из строки
          console.log('status in "Отклонить" button:', status); // Проверка значения статуса
          return (
            <button 
              onClick={() => ModeratorHandler('rejected', id)} 
              className="button-page-s red"
              disabled={status === "rejected" || status === "completed"} // Кнопка будет задизейблена, если заявка отклонена или завершена
            >
              Отклонить
            </button>
          );
        },
      },
    ],
    [dispatch]  // Добавляем dispatch в зависимости
  );

  return <CustomTable columns={columns} data={all_self_employed} onClick={handleClick} />;
};

export default SelfEmployedTable;
