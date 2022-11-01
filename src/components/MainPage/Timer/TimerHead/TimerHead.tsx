/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import './timerhead.css';
import { useRecoilValue } from 'recoil';
import { taskArr } from '../../../../state/atoms';
import { obj } from '../../../Icon';
import { nanoid } from 'nanoid';

export function TimerHead() {
  const data = useRecoilValue(taskArr);
  let leftoverTomatoes: { id: string }[] = [];

  const taskName =
    data.tasks.length > 0
      ? data.tasks[0].value
      : 'Поставте себе задачу, что бы начать';

  leftoverTomatoes = useMemo(() => {
    if (data.tasks[0] !== undefined) {
      for (let i = data.tasks[0].amountPomodoro; i > 0; --i) {
        leftoverTomatoes.push({ id: nanoid() });
      }
    }
    return leftoverTomatoes;
  }, [leftoverTomatoes, data.tasks]);

  return (
    <div className='timerHeader'>
      <span>{taskName}</span>
      <ul className='timerHeader__list'>
        {leftoverTomatoes.map((el) => {
          return <li key={el.id}>{obj.logoMini}</li>;
        })}
      </ul>
    </div>
  );
}
