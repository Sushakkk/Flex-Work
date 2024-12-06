import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import CustomTable from "../CustomTable";
import { formatDate } from "../../utils/utils";
import { T_SelfEmployed } from "../../utils/types";

interface SelfEmployedTableProps {
  all_self_employed: T_SelfEmployed[];
}

const SelfEmployedTable: React.FC<SelfEmployedTableProps> = ({ all_self_employed }) => {
  const navigate = useNavigate();

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
        accessor: "inn", // поле для даты завершения
        Cell: ({ value }: { value: string }) => value ? value : "",
      }
    ],
    []
  );

  return <CustomTable columns={columns} data={all_self_employed} onClick={handleClick} />;
};

export default SelfEmployedTable;
