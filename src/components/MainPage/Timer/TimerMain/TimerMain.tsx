/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../../../ui-kit/Button';
import { ITask, ITasks, taskArr } from '../../../../state/atoms';

import './timermain.css';

export function TimerMain() {
  const [data, setData] = useRecoilState(taskArr);

  const [timer, setTimer] = useState(data.timer * 60); // время таймера при запуске приложения
  const [start, setStart] = useState(false); // запущен таймер или нет
  const [timeBreak, setTimeBreak] = useState(false); // идёт перерыв или нет
  const [startDisabled, setStartDisabled] = useState(true); // активность кнопки старт
  const [stopDisabled, setStopDisabled] = useState(true); // активность кнопки стоп

  const minute = Math.floor(timer / 60);
  const sec = timer - minute * 60;

  useEffect(() => {
    // удаление задачи из списка после её завершени
    const taskComplited = () => {
      if (data.tasks[0].amountPomodoro > 1) {
        let newTask = {
          id: data.tasks[0].id,
          number: data.tasks[0].number,
          amountPomodoro: data.tasks[0].amountPomodoro - 1,
          value: data.tasks[0].value,
        };
        return [newTask, ...data.tasks.slice(1)];
      } else if (data.tasks[0].amountPomodoro === 1) {
        let newTask = data.tasks.slice(1);
        return newTask;
      } else {
        let newTask: ITask[] = [];
        return newTask;
      }
    };
    // если нет задач => старт отключен
    data.tasks.length === 0 ? setStartDisabled(true) : setStartDisabled(false);
    // если запущен секундомер => стоп активен
    start === true ? setStopDisabled(false) : setStopDisabled(true);
    const interval = setInterval(() => {
      //  логика работы таймера
      function time() {
        // таймер больше 0
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          // задачи в списке ещё есть и в очереди перерыв
          if (data.tasks.length >= 1 && timeBreak === false) {
            setData((oldData): ITasks => {
              const newData: ITasks = {
                amountPomodoroComplited: oldData.amountPomodoroComplited + 1,
                timer: oldData.timer,
                littleBreak: oldData.littleBreak,
                bigBreak: oldData.bigBreak,
                tasks: taskComplited(),
              };
              return newData;
            });
            setStart(false);
            setTimer(() => {
              const myBreak =
                data.amountPomodoroComplited !== 0 &&
                data.amountPomodoroComplited % 3 === 0
                  ? data.bigBreak * 60
                  : data.littleBreak * 60;
              return myBreak;
            });
            setTimeBreak(true);
          }
          // окончание перерыва
          else if (timeBreak === true) {
            setStart(false);
            setTimer(data.timer * 60);
            setTimeBreak(false);
          }
        }
      }
      start && time();
    }, 100);

    // задачи все выполнены
    if (data.tasks.length === 0) {
      setStart(false);
      setTimer(data.timer * 60);
      setTimeBreak(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [start, timer, data]);

  function dubleNumberDisplay(arg: number): string {
    return arg.toString().padStart(2, '0');
  }
  const secondsCountDown = () => {
    setStart(true);
  };

  const secondsCountStop = () => {
    setStart(false);
  };

  const currentTask = () => {
    const textValue =
      data.tasks.length > 0 ? (
        <>
          <span className='textGrey'>Задача {data.tasks[0].number} - </span>
          <span>{data.tasks[0].value}</span>
        </>
      ) : (
        <span className='textGrey'>Текущей задачи нет</span>
      );
    const textPause = <span className='textGrey'>Перерыв</span>;
    return timeBreak ? textPause : textValue;
  };

  return (
    <div className='timer__main'>
      <button className='ringBtn timer__decr'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.27559 9.13215H0V6.70291H6.27559V6.70291H16V9.13215H9.27559Z'
            fill='white'
          />
        </svg>
      </button>
      <div className='timer__minute tm'>{dubleNumberDisplay(minute)}</div>
      <div className='timer__colon'>
        <svg
          viewBox='0 0 32 32'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <path
            d='M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z'
            id='XMLID_294_'
          />
          <path
            d='M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z'
            id='XMLID_295_'
          />
        </svg>
      </div>
      <div className='timer__seconds tm'>{dubleNumberDisplay(sec)}</div>
      <button className='ringBtn timer__incr'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9.27559 9.13215V16H6.72441V9.13215H0V6.70291H6.72441V0H9.27559V6.70291H16V9.13215H9.27559Z'
            fill='white'
          />
        </svg>
      </button>
      <p className='timer__task'>{currentTask()}</p>
      <Button
        styleBtn='green'
        text='Старт'
        className='timer__start'
        onClick={secondsCountDown}
        disabled={startDisabled}
      />
      <Button
        styleBtn='red'
        text='Стоп'
        className='timer__stop'
        onClick={secondsCountStop}
        disabled={stopDisabled}
      />
    </div>
  );
}
