import React, { useEffect } from 'react';
import './timer.css';
import { TimerHead } from './TimerHead';
import { TimerMain } from './TimerMain/TimerMain';

import { useRecoilValue } from 'recoil';
import { taskArr } from '../../../state/atoms';

export function Timer() {
  const a = useRecoilValue(taskArr);

  useEffect(() => {}, [a]);

  return (
    <div className='timer'>
      <TimerHead />
      <TimerMain />
    </div>
  );
}
