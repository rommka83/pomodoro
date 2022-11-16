import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { weekState } from '../../../../state/weekState';
import './foundation.css';

export function Foundation() {
  const week = useRecoilValue(weekState);

  const determinationOFmarkingCoordinates = useCallback(
    (i: number) => {
      const maxHight = Math.max(
        ...week.map((el) => {
          return el.totalWorkTime;
        })
      );
      return Math.floor(maxHight / i / 3600) !== 0
        ? `${Math.floor(maxHight / i / 3600)} час ${Math.floor(
            (maxHight / i - Math.floor(maxHight / i / 3600)) / 60
          )} мин`
        : `${Math.floor(
            (maxHight / i - Math.floor(maxHight / i / 3600)) / 60
          )} мин`;
    },
    [week]
  );

  // количество линий и диапазон можно менять, задав параметры функции
  function lineRender(a: number, b: number) {
    let arr = [];
    let hightLine = `${(1 / (b - a)) * 100}%`;
    for (let i = a; i < b; i++) {
      arr.push(i);
    }
    return arr.map((el) => {
      return (
        <li className='fondation__item' style={{ height: hightLine }} key={el}>
          <div className='fondation__line'></div>
          <span className='fondation__scale'>
            {determinationOFmarkingCoordinates(el)}
          </span>
        </li>
      );
    });
  }

  return <ul className='fondation'>{lineRender(1, 5)}</ul>;
}
