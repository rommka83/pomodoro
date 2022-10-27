import React from 'react';
import { Dropdown } from './Dropdown';
import './listtask.css';

const taskArr = [
  { id: 1, value: 'Сверстать сайт' },
  { id: 2, value: 'Сверстать сайт Сверстать сайт Сверстать сайт' },
  { id: 3, value: 'Сверстать сайт' },
  { id: 4, value: 'Сверстать сайт Сверстать сайт' },
];

export function ListTask() {
  return (
    <div className='listtask'>
      <ul className='listtask__list'>
        <div className='line'></div>
        {taskArr.map((el) => {
          return (
            <li className='listtask__item' key={el.id}>
              <div className='listtask__number'>{el.id}</div>
              <span className='listtask__value'>{el.value}</span>
              <Dropdown className='listtask__dropdown' />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
