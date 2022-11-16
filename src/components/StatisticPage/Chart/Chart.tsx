import { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IDay } from '../../../state/statistic';
import './chart.css';
import 'moment/locale/ru';
import { weekState } from '../../../state/weekState';
import { Foundation } from './Foundation';
import { statisticOneDayState } from '../../../state/statisticOneDay';

interface IChart {
  className?: string;
}

export function Chart({ className }: IChart) {
  const week = useRecoilValue(weekState);
  const oneDaySet = useSetRecoilState(statisticOneDayState);

  const maxValue = useMemo(() => {
    return Math.max(
      ...week.map((el) => {
        return el.totalWorkTime;
      })
    );
  }, [week]);

  const chartHeight = useCallback(
    (obj: IDay) => {
      let heightFactor: number = 400 / maxValue;
      return { height: obj.totalWorkTime * heightFactor };
    },
    [maxValue]
  );
  return (
    <div className={`chart ${className}`}>
      <Foundation />
      <ul className='dayWeekChart'>
        {week.map((el) => {
          return el.totalWorkTime > 0 ? (
            <li
              tabIndex={0}
              className='dayWeekChart__item'
              key={el.date}
              onClick={() => oneDaySet(el)}
            >
              <div style={chartHeight(el)}></div>
              <span>{el.dayText}</span>
            </li>
          ) : (
            <li tabIndex={0} className='dayWeekChart__item' key={el.date}>
              <div className='dayWeekChart__item_default'></div>
              <span>{el.dayText}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
