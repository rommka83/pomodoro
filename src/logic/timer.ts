import { ITask, ITasks } from '../state/atoms';

function actionsOnAnArrayOfTasksAfterCompletionPomodoro(tasks: ITask[]) {
  if (tasks.length > 0 && tasks[0].amountPomodoro > 0) {
    tasks[0].amountPomodoro = tasks[0].amountPomodoro - 1;
  } else if (tasks.length > 0 && tasks[0].amountPomodoro === 0) {
    tasks = tasks.slice(1);
  } else {
    tasks = [];
  }
  return tasks;
}

function myBreak(data: ITasks) {
  data = {
    amountPomodoroComplited: data.amountPomodoroComplited + 1,
    timer: data.timer,
    littleBreak: data.littleBreak,
    bigBreak: data.bigBreak,
    tasks: actionsOnAnArrayOfTasksAfterCompletionPomodoro(data.tasks),
  };
  return data;
}

export const timerLogic = (data: ITasks) => {
  let timer = data.timer;
  let timeBreak: true | false = false;

  // таймер больше 0
  if (timer > 0) {
    timer = timer - 1;
  } else {
    // задачи в списке ещё есть и в очереди перерыв
    if (data.tasks.length > 0 && timeBreak === false) {
      data = myBreak(data);
      timer =
        data.amountPomodoroComplited !== 0 &&
        data.amountPomodoroComplited % 3 === 0
          ? data.bigBreak * 60
          : data.littleBreak * 60;
      timeBreak = true;
    }
    // задачи все выполнены
    else if (data.tasks.length === 1 && timeBreak === false) {
      data = myBreak(data);
      timer = data.timer * 60;
    }
    // окончание перерыва
    else if (data.tasks.length > 0 && timeBreak !== false) {
      timer = data.timer * 60;
      timeBreak = false;
    }
  }
  return data;
};
