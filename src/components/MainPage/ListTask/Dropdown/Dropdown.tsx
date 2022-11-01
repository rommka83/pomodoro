import React, { useEffect, useRef, useState } from 'react';
import './dropdown.css';
import { obj } from './../../../Icon/Icon';

interface IDropdown {
  className?: string;
}

export function Dropdown({ className }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function dropDownIsClose(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !dropDown.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', dropDownIsClose);
    return () => {
      document.removeEventListener('click', dropDownIsClose);
    };
  }, []);

  return (
    <div className={`dropdown ${className}`} ref={dropDown}>
      <button
        className='dropdown__btn'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          width='26'
          height='6'
          viewBox='0 0 26 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='3' cy='3' r='3' fill='#C4C4C4' />
          <circle cx='13' cy='3' r='3' fill='#C4C4C4' />
          <circle cx='23' cy='3' r='3' fill='#C4C4C4' />
        </svg>
        {isOpen && (
          <>
            <div className='dropdown__arrow'></div>
            <ul className='dropdown__list'>
              <li>
                <button className='dropdown__item'>
                  {obj.increase}Увеличить
                </button>
              </li>
              <li>
                <button className='dropdown__item'>
                  {obj.decrease}Уменьшить
                </button>
              </li>
              <li>
                <button className='dropdown__item'>
                  {obj.edit}Редактировать
                </button>
              </li>
              <li>
                <button className='dropdown__item'>{obj.delete}Удалить</button>
              </li>
            </ul>
          </>
        )}
      </button>
    </div>
  );
}
