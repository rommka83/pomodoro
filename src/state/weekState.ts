import { atom } from 'recoil';
import { IDay } from './statistic';

const weekState = atom<IDay[]>({
  key: 'weekState',
  default: [],
});

export { weekState };
