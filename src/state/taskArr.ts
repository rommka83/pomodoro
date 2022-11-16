import { atom, DefaultValue } from 'recoil';

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

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: ITasks) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const taskArr = atom<ITasks>({
  key: 'taskArr',
  default: {
    amountPomodoroComplited: 0,
    timer: 3,
    littleBreak: 1,
    bigBreak: 2,
    tasks: [],
  },
  effects_UNSTABLE: [localStorageEffect('task_arr')],
});

export { taskArr };
