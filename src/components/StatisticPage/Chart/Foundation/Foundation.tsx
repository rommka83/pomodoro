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
      i = i + 1;
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
  function lineRender(a: number) {
    let arr = [];
    let hightLine = `${(1 / a) * 100}%`;
    for (let i = 0; i !== a; i++) {
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

  return <ul className='fondation'>{lineRender(4)}</ul>;
}
