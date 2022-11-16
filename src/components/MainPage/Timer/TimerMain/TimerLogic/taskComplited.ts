/* eslint-disable react-hooks/rules-of-hooks */
import { useRecoilValue } from 'recoil';
import { ITask, ITasks, taskArr } from '../../../../../state/taskArr';

export function taskComplited(arr: ITask[]) {
  if (arr[0].amountPomodoro > 1) {
    let newTask = {
      id: arr[0].id,
      number: arr[0].number,
      amountPomodoro: arr[0].amountPomodoro - 1,
      value: arr[0].value,
    };
    return [newTask, ...arr.slice(1)];
  } else if (arr[0].amountPomodoro === 1) {
    let newTask = arr.slice(1);
    return newTask;
  } else {
    let newTask: ITask[] = [];
    return newTask;
  }
}
