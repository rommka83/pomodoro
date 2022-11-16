/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../../../ui-kit/Button';
import { ITasks, taskArr } from '../../../../state/taskArr';
import useSound from 'use-sound';
import gong from '../../../../sound/gong.mp3';
import './timermain.css';
import { taskComplited } from './TimerLogic/taskComplited';
import { dubleNumberDisplay } from './TimerLogic/dubleNumberDisplay';
import { currentTask } from './TimerLogic/currentTask';
import { statistic } from '../../../../state/statistic';

import moment from 'moment';
import 'moment/locale/ru';
import { timerState } from '../../../../state/timerState';
import { IDay } from './../../../../state/statistic';

export function TimerMain() {
  const [data, setData] = useRecoilState(taskArr);
  const [{ start, timeBreak, pause }, setTimerState] =
    useRecoilState(timerState); // запущен ли таймер, идёт ли перерыв, стоит ли пауза
  const [statisticData, setStatisticData] = useRecoilState(statistic);
  const [timer, setTimer] = useState(data.timer * 60);
  const [startDisabled, setStartDisabled] = useState(true); // активность кнопки старт
  const [stopDisabled, setStopDisabled] = useState(true); // активность кнопки стоп
  const [play] = useSound(gong);

  const minute = Math.floor(timer / 60);
  const sec = timer - minute * 60;

  const newDayStatistic: IDay = {
    week: moment().week(),
    date: moment().format('L'),
    day: Number(moment().format('e')),
    dayText: moment().format('dd'),
    totalWorkTime: 0,
    totalNumberOFtomatoes: 0,
    focusTime: 0,
    pauseTime: 0,
    breakTime: 0,
    stopping: 0,
  };
  function baseLeveling() {
    if (
      statisticData.length !== 0 &&
      statisticData[0].date === newDayStatistic.date
    ) {
      return;
    } else if (
      statisticData.length !== 0 &&
      statisticData[0].date !== newDayStatistic.date
    ) {
      setStatisticData((oldValue) => {
        return [newDayStatistic, ...oldValue];
      });
    } else if (statisticData.length === 0) {
      setStatisticData((): IDay[] => {
        return [newDayStatistic];
      });
    }
  }

  //  логика работы таймера
  function time() {
    // таймер больше 0
    if (timer > 0) {
      setTimer(timer - 1);
      timeBreak
        ? setStatisticData((oldValue) => {
            return [{ ...oldValue[0], breakTime: oldValue[0].breakTime + 1 }];
          })
        : setStatisticData((oldValue) => {
            return [
              { ...oldValue[0], totalWorkTime: oldValue[0].totalWorkTime + 1 },
            ];
          });
    } else {
      play();
      setStatisticData((oldValue) => {
        if (oldValue[0].totalWorkTime === 0) return oldValue;
        return [
          {
            ...oldValue[0],
            focusTime: Math.round(
              (oldValue[0].totalWorkTime /
                (oldValue[0].totalWorkTime +
                  oldValue[0].pauseTime +
                  oldValue[0].breakTime)) *
                100
            ),
          },
        ];
      });

      // задачи в списке ещё есть и в очереди перерыв
      if (data.tasks.length >= 1 && timeBreak === false) {
        setData((oldData) => {
          return {
            ...oldData,
            amountPomodoroComplited: oldData.amountPomodoroComplited + 1,
            tasks: taskComplited(data.tasks),
          };
        });
        setStatisticData((oldValue) => {
          return [
            {
              ...oldValue[0],
              totalNumberOFtomatoes: oldValue[0].totalNumberOFtomatoes + 1,
            },
          ];
        });
        setTimerState(() => {
          return { start: false, timeBreak: true, pause: false };
        });
        setTimer(
          data.amountPomodoroComplited !== 0 &&
            data.amountPomodoroComplited % 3 === 0
            ? data.bigBreak * 60
            : data.littleBreak * 60
        );
      }

      // выполнение крайней задачи
      if (data.tasks.length === 0 && timeBreak === false) {
        setStatisticData((oldValue) => {
          return [
            {
              ...oldValue[0],
              totalNumberOFtomatoes: oldValue[0].totalNumberOFtomatoes + 1,
            },
          ];
        });
      }

      // окончание перерыва
      if (timeBreak === true) {
        setTimerState(() => {
          return { start: false, timeBreak: false, pause: false };
        });
        setTimer(data.timer * 60);
      }
    }
  }

  useEffect(() => {
    baseLeveling();

    data.tasks.length === 0 ? setStartDisabled(true) : setStartDisabled(false); // если нет задач => старт отключен
    start === true ? setStopDisabled(false) : setStopDisabled(true); // если запущен секундомер => стоп активен
    if (start === false && timeBreak) setStopDisabled(false); // если стоит пауза во время перерыва => стоп активен

    const interval = setInterval(() => {
      start && time();
      pause &&
        setStatisticData((oldValue) => {
          return [{ ...oldValue[0], pauseTime: oldValue[0].pauseTime + 1 }];
        });
    }, 1000);

    // отсутствуют невыполненые задачи
    if (data.tasks.length === 0) {
      setTimerState(() => {
        return { start: false, timeBreak: false, pause: false };
      });
      setTimer(data.timer * 60);
    }
    // отслеживаю перерывы
    if (data.amountPomodoroComplited > 4)
      setData((oldData) => {
        return { ...oldData, amountPomodoroComplited: 1 };
      });

    return () => {
      clearInterval(interval);
    };
  }, [start, data, timer]);

  const startCountDown = () => {
    setTimerState((oldTimerState) => {
      return { start: true, timeBreak: oldTimerState.timeBreak, pause: false };
    });
  };
  const pauseTask = () => {
    setTimerState((oldTimerState) => {
      return { start: false, timeBreak: oldTimerState.timeBreak, pause: true };
    });
  };
  const stopTasks = () => {
    if (timeBreak) {
      skippingAbreak();
    } else {
      setTimerState((oldTimerState) => {
        return { start: false, timeBreak: false, pause: oldTimerState.pause };
      });
      setTimer(data.timer * 60);
      setStatisticData((oldValue) => {
        return [{ ...oldValue[0], stopping: oldValue[0].stopping + 1 }];
      });
    }
  };
  function skippingAbreak() {
    setTimerState(() => {
      return { start: false, timeBreak: false, pause: false };
    });
    setTimer(data.timer * 60);
  }
  const reasonForStopping = () => {
    if (timeBreak) {
      skippingAbreak();
    } else {
      setData((oldData): ITasks => {
        const newData: ITasks = {
          amountPomodoroComplited: oldData.amountPomodoroComplited + 1,
          timer: oldData.timer,
          littleBreak: oldData.littleBreak,
          bigBreak: oldData.bigBreak,
          tasks: data.tasks.length > 0 ? data.tasks.slice(1) : [],
        };
        return newData;
      });
      setTimerState(() => {
        return { start: false, timeBreak: true, pause: false };
      });
      setTimer(
        data.amountPomodoroComplited !== 0 &&
          data.amountPomodoroComplited % 3 === 0
          ? data.bigBreak * 60
          : data.littleBreak * 60
      );
    }
  };

  const timerColor = useMemo(() => {
    if (start && timeBreak) {
      return 'tm_timeBreak';
    } else if (start && !timeBreak) {
      return 'tm_start';
    } else return null;
  }, [start, timeBreak, pause]);

  const timeDecrement = () => {
    if (!timeBreak) {
      setData((oldData): ITasks => {
        return {
          ...oldData,
          timer: oldData.timer > 0 ? oldData.timer - 1 : 0,
        };
      });
      setTimer(timer > 0 ? timer - 60 : 0);
    } else {
      if (data.amountPomodoroComplited % 4 === 0) {
        setData((oldData): ITasks => {
          return {
            ...oldData,
            bigBreak: oldData.bigBreak > 0 ? oldData.bigBreak - 1 : 0,
          };
        });
        setTimer(timer > 0 ? timer - 60 : 0);
      } else {
        setData((oldData): ITasks => {
          return {
            ...oldData,
            littleBreak: oldData.littleBreak > 0 ? oldData.littleBreak - 1 : 0,
          };
        });
        setTimer(timer > 0 ? timer - 60 : 0);
      }
    }
  };
  const timeIncrement = () => {
    if (!timeBreak) {
      setData((oldData): ITasks => {
        return { ...oldData, timer: oldData.timer + 1 };
      });
      setTimer(timer + 60);
    } else {
      if (data.amountPomodoroComplited % 4 === 0) {
        setData((oldData): ITasks => {
          return {
            ...oldData,
            bigBreak: oldData.bigBreak + 1,
          };
        });
        setTimer(timer + 60);
      } else {
        setData((oldData): ITasks => {
          return {
            ...oldData,
            littleBreak: oldData.littleBreak + 1,
          };
        });
        setTimer(timer + 60);
      }
    }
  };

  return (
    <div className='timer__main'>
      <button
        disabled={start || pause ? true : false}
        className='ringBtn timer__decr'
        onClick={timeDecrement}
      >
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
      <div className={`timer__minute tm ${timerColor}`}>
        {dubleNumberDisplay(minute)}
      </div>
      <div className={`timer__colon ${timerColor}`}>
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
      <div className={`timer__seconds tm ${timerColor}`}>
        {dubleNumberDisplay(sec)}
      </div>
      <button
        disabled={start || pause ? true : false}
        className='ringBtn timer__incr'
        onClick={timeIncrement}
      >
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
      <p className='timer__task'>{currentTask(data.tasks, timeBreak)}</p>

      {start ? (
        <Button
          styleBtn='green'
          text={'Пауза'}
          className='timer__start'
          onClick={pauseTask}
          disabled={startDisabled}
        />
      ) : (
        <Button
          styleBtn='green'
          text={pause ? 'Продолжить' : 'Старт'}
          className='timer__start'
          onClick={startCountDown}
          disabled={startDisabled}
        />
      )}

      {pause ? (
        <Button
          styleBtn='red'
          text={timeBreak ? 'Пропустить' : 'Сделано'}
          className='timer__stop'
          onClick={reasonForStopping}
        />
      ) : (
        <Button
          styleBtn='red'
          text={timeBreak ? 'Пропустить' : 'Стоп'}
          className='timer__stop'
          onClick={stopTasks}
          disabled={stopDisabled}
        />
      )}
    </div>
  );
}
