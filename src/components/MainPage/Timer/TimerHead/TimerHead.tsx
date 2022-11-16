/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import './timerhead.css';
import { useRecoilValue } from 'recoil';
import { taskArr } from '../../../../state/taskArr';
import { obj } from '../../../Icon';
import { nanoid } from 'nanoid';
import { timerState } from '../../../../state/timerState';

export function TimerHead() {
  const { tasks } = useRecoilValue(taskArr);
  const { start, timeBreak, pause } = useRecoilValue(timerState); // запущен ли таймер и идёт перерыв или нет

  let leftoverTomatoes: { id: string }[] = [];

  const taskName =
    tasks.length > 0 ? tasks[0].value : 'Поставте себе задачу, что бы начать';

  leftoverTomatoes = useMemo(() => {
    if (tasks[0] !== undefined) {
      for (let i = tasks[0].amountPomodoro; i > 0; --i) {
        leftoverTomatoes.push({ id: nanoid() });
      }
    }
    return leftoverTomatoes;
  }, [leftoverTomatoes, tasks]);

  const headColor = useMemo(() => {
    if ((start || pause) && timeBreak) {
      return 'timerHeader_timeBreak';
    } else if ((start || pause) && !timeBreak) {
      return 'timerHeader_start';
    } else return null;
  }, [start, timeBreak, pause]);

  return (
    <div className={`timerHeader ${headColor}`}>
      <span>{taskName}</span>
      <ul className='timerHeader__list'>
        {leftoverTomatoes.map((el) => {
          return (
            <li className='timerHeader__item' key={el.id}>
              {obj.logoMini}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
