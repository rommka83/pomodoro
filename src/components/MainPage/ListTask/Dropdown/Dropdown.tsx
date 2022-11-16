/* eslint-disable array-callback-return */
import { useEffect, useRef, useState } from 'react';
import './dropdown.css';
import { obj } from './../../../Icon/Icon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { taskArr } from '../../../../state/taskArr';
import { Modal } from '../../../Modal';
import { formValue } from '../../../../state/formValue';

interface IDropdown {
  className?: string;
  id: string;
}

export function Dropdown({ className, id }: IDropdown) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const dropDown = useRef<HTMLDivElement>(null);
  const [data, setData] = useRecoilState(taskArr);
  const setValue = useSetRecoilState(formValue);

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

  function increaseTheNumberOfTomatoes(id: string) {
    setData((oldData) => {
      return {
        ...oldData,
        tasks: oldData.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                amountPomodoro: task.amountPomodoro + 1,
              }
            : task
        ),
      };
    });
  }

  function decreaseTheNumberOfTomatoes(id: string) {
    setData((oldData) => {
      return {
        ...oldData,
        tasks: oldData.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                amountPomodoro:
                  task.amountPomodoro > 1 ? task.amountPomodoro - 1 : 1,
              }
            : task
        ),
      };
    });
  }

  function changeContent(id: string) {
    data.tasks.map((task) => {
      task.id === id &&
        setValue((oldVal) => {
          return { ...oldVal, value: task.value, idChangeableTask: task.id };
        });
    });
  }

  function deletTask(id: string) {
    const newTasks = data.tasks.filter((task) => task.id !== id);
    setData((oldData) => {
      return { ...oldData, tasks: newTasks };
    });
  }

  function modalOpen() {
    setIsOpen(false);
    setIsModal(true);
  }

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
      </button>
      {isOpen && (
        <>
          <div className='dropdown__arrow'></div>
          <ul className='dropdown__list'>
            <li
              className='dropdown__item'
              onClick={() => increaseTheNumberOfTomatoes(id)}
            >
              {obj.increase}Увеличить
            </li>
            <li
              className='dropdown__item'
              onClick={() => decreaseTheNumberOfTomatoes(id)}
            >
              {obj.decrease}Уменьшить
            </li>
            <li className='dropdown__item' onClick={() => changeContent(id)}>
              {obj.edit}Редактировать
            </li>
            <li className='dropdown__item' onClick={() => modalOpen()}>
              {obj.delete}Удалить
            </li>
          </ul>
        </>
      )}
      {isModal && (
        <Modal
          close={() => setIsModal(false)}
          onClick={async () => deletTask(id)}
        />
      )}
    </div>
  );
}
