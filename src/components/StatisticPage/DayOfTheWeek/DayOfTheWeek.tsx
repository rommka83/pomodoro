import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { statisticOneDayState } from '../../../state/statisticOneDay';
import './dayoftheweek.css';

interface IDayOfTheWeek {
  className?: string;
}

export function DayOfTheWeek({ className }: IDayOfTheWeek) {
  const oneDay = useRecoilValue(statisticOneDayState);

  const totalWorkTime = useMemo(() => {
    return Math.floor(oneDay.totalWorkTime / 60) !== 0 ? (
      Math.floor(oneDay.totalWorkTime / 3600) > 0 ? (
        <div>
          <span>Вы работали над задачами в течение</span>
          <span className='dayOfTheWeek__content_red'>
            {` ${Math.floor(oneDay.totalWorkTime / 3600)} час ${Math.floor(
              oneDay.totalWorkTime / 60
            )} мин`}
          </span>
        </div>
      ) : (
        <div>
          <span>Вы работали над задачами в течение</span>
          <span className='dayOfTheWeek__content_red'>{` ${Math.floor(
            oneDay.totalWorkTime / 60
          )} мин`}</span>
        </div>
      )
    ) : (
      <span>Нет данных</span>
    );
  }, [oneDay]);

  const dayWeek = useMemo(() => {
    if (oneDay.day === 0) {
      return 'понедельник';
    } else if (oneDay.day === 1) {
      return 'вторник';
    } else if (oneDay.day === 2) {
      return 'среда';
    } else if (oneDay.day === 3) {
      return 'четверг';
    } else if (oneDay.day === 4) {
      return 'пятница';
    } else if (oneDay.day === 5) {
      return 'суббота';
    } else if (oneDay.day === 6) {
      return 'воскресенье';
    }
  }, [oneDay]);

  return (
    <div className={`dayOfTheWeek ${className}`}>
      <h3 className='dayOfTheWeek__title'>{dayWeek}</h3>
      <div className='dayOfTheWeek__content'>{totalWorkTime}</div>
    </div>
  );
}
