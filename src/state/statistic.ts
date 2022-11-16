import { atom, DefaultValue } from 'recoil';

export interface IDay {
  week: number;
  date: string;
  day: number;
  dayText: string;
  totalWorkTime: number;
  totalNumberOFtomatoes: number;
  focusTime: number;
  pauseTime: number;
  breakTime: number;
  stopping: number;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IDay[]) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

const statistic = atom<IDay[]>({
  key: 'statistic',
  default: [],
  effects_UNSTABLE: [localStorageEffect('statistic')],
});

export { statistic };
// [
//   {
//     breakTime: 1200,
//     date: '15.11.2022',
//     day: 1,
//     dayText: 'вт',
//     focusTime: 0,
//     pauseTime: 0,
//     stopping: 0,
//     totalNumberOFtomatoes: 0,
//     totalWorkTime: 0,
//     week: 46,
//   },
// ];
