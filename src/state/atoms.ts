import { atom } from 'recoil';

// const localStorageTask =
//   (key: string) =>
//   ({ setSelf, onSet }) => {
//     const savedValue = localStorage.getItem(key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue) => {
//       localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

export interface ITask {
  id: string;
  number: number;
  amountPomodoro: number;
  value: string;
}

export interface ITasks {
  amountPomodoroComplited: number;
  timer: number;
  littleBreak: number;
  bigBreak: number;
  tasks: ITask[];
}

const taskArr = atom<ITasks>({
  key: 'taskArr',
  default: {
    amountPomodoroComplited: 0,
    timer: 0.1,
    littleBreak: 0.1,
    bigBreak: 0.1,
    tasks: [],
  },
});

export { taskArr };
