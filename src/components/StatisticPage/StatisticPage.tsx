import { useEffect, useMemo, useState } from 'react';
import { AmountPomodoro } from './AmountPomodoro';
import { Chart } from './Chart';
import { DayOfTheWeek } from './DayOfTheWeek';
import { Filter } from './Filter';
import './statisticpage.css';
import { obj } from './../Icon/Icon';
import { StatisticElement } from './StatisticElement';
import { useRecoilValue } from 'recoil';
import { statisticOneDayState } from '../../state/statisticOneDay';

export function StatisticPage() {
  const oneDay = useRecoilValue(statisticOneDayState);
  const [backgroundGrey, setBackgroundGrey] = useState(false);

  const pauseTime = useMemo(() => {
    return Math.floor(oneDay.pauseTime / 3600) > 0
      ? `${Math.floor(oneDay.pauseTime / 3600)}Ч ${Math.floor(
          oneDay.pauseTime / 60
        )}М`
      : `${Math.floor(oneDay.pauseTime / 60)}М`;
  }, [oneDay]);

  const bgColor = useMemo(() => {
    return oneDay.totalWorkTime === 0 ? 'grey' : '';
  }, [oneDay]);

  useEffect(() => {
    oneDay.totalWorkTime !== 0
      ? setBackgroundGrey(true)
      : setBackgroundGrey(false);
  }, [oneDay]);
  return (
    <div className='statisticPage container'>
      <h3 className='statisticPageTitle'>Ваша активность</h3>
      <Filter className='statisticPage__Filter' />
      <DayOfTheWeek className='statisticPage__DayOfTheWeek' />
      <AmountPomodoro className='statisticPage__AmountPomodoro' />
      <Chart className='statisticPage__Chart' />
      <StatisticElement
        title='Фокус'
        content={`${oneDay.focusTime}%`}
        img={backgroundGrey ? obj.focus : obj.focusGrey}
        className={`statisticPage__Focus ${bgColor}`}
      />
      <StatisticElement
        title='Время на паузе'
        content={pauseTime}
        img={backgroundGrey ? obj.pauseTime : obj.pauseGrey}
        className={`statisticPage__PauseTime ${bgColor}`}
      />
      <StatisticElement
        title='Остановки'
        content={`${oneDay.stopping}`}
        img={backgroundGrey ? obj.stopping : obj.stoppingGrey}
        className={`statisticPage__Stopping ${bgColor}`}
      />
    </div>
  );
}
