import React, { useEffect, useState } from 'react';
import { Dropdown } from './Dropdown';
import './listtask.css';
import { useRecoilValue } from 'recoil';
import { taskArr } from '../../../state/atoms';

export function ListTask() {
  const data = useRecoilValue(taskArr);
  const [thereIsAtask, setThereIsAtask] = useState(false);
  useEffect(() => {
    data.tasks.length >= 1 ? setThereIsAtask(true) : setThereIsAtask(false);
  }, [data]);

  return (
    <div className='listtask'>
      <ul className='listtask__list'>
        <div className='line'></div>
        {thereIsAtask &&
          data.tasks.map((el) => {
            return (
              <li className='listtask__item' key={el.id}>
                <div className='listtask__number'>{el.amountPomodoro}</div>
                <span className='listtask__value'>{el.value}</span>
                <Dropdown className='listtask__dropdown' />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
