/* eslint-disable react-hooks/rules-of-hooks */
// import { useRecoilState } from 'recoil';
// import {  ITasks, taskArr, timerState, timerValue } from '../state/atoms';

// const [data, setData] = useRecoilState(taskArr);
// const [{ timer }, setTimer] = useRecoilState(timerValue);
// const [{ start, timeBreak, pause }, setTimerState] = useRecoilState(timerState); // запущен ли таймер, идёт ли перерыв, стоит ли пауза
// const [timer, setTimer] = useState(data.timer * 60); // время таймера при запуске приложения

// удаление задачи из списка после её завершени
// export function taskComplited() {
//   const [data, setData] = useRecoilState(taskArr);
//   useRecoilState(timerState); // запущен ли таймер, идёт ли перерыв, стоит ли пауза

//   if (data.tasks[0].amountPomodoro > 1) {
//     let newTask = {
//       id: data.tasks[0].id,
//       number: data.tasks[0].number,
//       amountPomodoro: data.tasks[0].amountPomodoro - 1,
//       value: data.tasks[0].value,
//     };
//     return [newTask, ...data.tasks.slice(1)];
//   } else if (data.tasks[0].amountPomodoro === 1) {
//     let newTask = data.tasks.slice(1);
//     return newTask;
//   } else {
//     let newTask: ITask[] = [];
//     return newTask;
//   }
// }

export function time() {
  //   const [data, setData] = useRecoilState(taskArr);
  //   const [{ timer }, setTimer] = useRecoilState(timerValue);
  //   const [{ start, timeBreak, pause }, setTimerState] =
  //     useRecoilState(timerState); // запущен ли таймер, идёт ли перерыв, стоит ли пауза
  //   // таймер больше 0
  //   if (timer > 0) {
  //     setTimer((oldTimer) => {
  //       return { ...oldTimer, timer: timer - 1 };
  //     });
  //   } else {
  //     // задачи в списке ещё есть и в очереди перерыв
  //     if (data.tasks.length >= 1 && timeBreak === false) {
  //       setData((oldData): ITasks => {
  //         return {
  //           ...oldData,
  //           amountPomodoroComplited: oldData.amountPomodoroComplited + 1,
  //           tasks: taskComplited(),
  //         };
  //       });
  //       setTimerState(() => {
  //         return { start: false, timeBreak: true, pause: false };
  //       });
  //       setTimer((oldTimer) => {
  //         const myBreak =
  //           data.amountPomodoroComplited !== 0 &&
  //           data.amountPomodoroComplited % 3 === 0
  //             ? data.bigBreak * 60
  //             : data.littleBreak * 60;
  //         return { ...oldTimer, timer: myBreak };
  //       });
  //     }
  //     // окончание перерыва
  //     if (timeBreak === true) {
  //       setTimerState(() => {
  //         return { start: false, timeBreak: false, pause: false };
  //       });
  //       setTimer((oldTimer) => {
  //         return { ...oldTimer, timer: data.timer * 60 };
  //       });
  //     }
  //   }
}
