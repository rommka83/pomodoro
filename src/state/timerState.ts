import { atom } from 'recoil';

export interface ITimerState {
  start: boolean;
  timeBreak: boolean;
  pause: boolean;
}
const timerState = atom<ITimerState>({
  key: 'timerState',
  default: { start: false, timeBreak: false, pause: false },
});

export { timerState };
