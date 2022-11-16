import { useRecoilValue } from 'recoil';
import { statisticOneDayState } from '../../../state/statisticOneDay';
import { obj } from '../../Icon';
import './amountpomodoro.css';

interface IAmountPomodoro {
  className?: string;
}

export function AmountPomodoro({ className }: IAmountPomodoro) {
  const oneDay = useRecoilValue(statisticOneDayState);

  return oneDay.totalWorkTime === 0 ? (
    <div className={`amountPomodoro ${className}`}>{obj.happyTomat}</div>
  ) : (
    <div className={`amountPomodoro ${className}`}>
      <div className='amountPomodoro__img'>
        {obj.logoBig}
        <span className='amountPomodoro__text'>
          {obj.exit} {oneDay.totalNumberOFtomatoes}
        </span>
      </div>
      <p className='amountPomodoroFooter'>{oneDay.totalNumberOFtomatoes}</p>
    </div>
  );
}
