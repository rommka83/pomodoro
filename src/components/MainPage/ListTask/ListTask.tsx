import { useEffect, useState } from 'react';
import { Dropdown } from './Dropdown';
import './listtask.css';
import { useRecoilValue } from 'recoil';
import { taskArr } from '../../../state/taskArr';

export function ListTask() {
  const data = useRecoilValue(taskArr);
  const [thereIsAtask, setThereIsAtask] = useState(false);
  useEffect(() => {
    data.tasks.length >= 1 ? setThereIsAtask(true) : setThereIsAtask(false);
  }, [data]);

  const totalDuration = () => {
    const initialValue = 0;
    const totalAmountPomodoro = data.tasks.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.amountPomodoro * data.timer,
      initialValue
    );
    const hour = Math.floor(totalAmountPomodoro / 60);
    const minute = totalAmountPomodoro - hour * 60;
    return `${hour} час ${minute} мин`;
  };

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
                <Dropdown id={el.id} className='listtask__dropdown' />
              </li>
            );
          })}
      </ul>
      <p className='totalDuration'>{totalDuration()}</p>
    </div>
  );
}
