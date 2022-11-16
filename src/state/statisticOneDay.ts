import { atom } from 'recoil';
import { IDay } from './statistic';

const statisticOneDayState = atom<IDay>({
  key: 'statisticOneDayState',
  default: {
    week: 0,
    date: '',
    day: 0,
    dayText: '',
    totalWorkTime: 0,
    totalNumberOFtomatoes: 0,
    focusTime: 0,
    pauseTime: 0,
    breakTime: 0,
    stopping: 0,
  },
});

export { statisticOneDayState };
