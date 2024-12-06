import React from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import './CustomTable.css'; // Добавим файл CSS для стилей карточек

function CustomTable({ columns, data, onClick, handleCheckboxChange, deleteActivityFromSelfEmployedHandler }) {
    const {
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    });


    return (
        <div className="basket__cards">
            {rows.map((row, i) => {
                prepareRow(row);
                const activity = row.original; // Доступ к данным строки
                return (
                    <div className="basket__row" key={activity.id}>
                        <div className="basket__card item-basket">
                        <div className="item-basket__header">
                                <span className="item-basket__number">№ {i + 1}</span>
                                <span className="item-basket__date">{activity.date}</span>
                            </div>
                            <div className="item-basket__img">
                                <img src={activity.img_url} alt={activity.title} />
                            </div>


                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CustomTable;
