import { ITask } from '../../../../../state/taskArr';

export function currentTask(arr: ITask[], timeBreak: boolean) {
  const textValue =
    arr.length > 0 ? (
      <>
        <span className='textGrey'>Задача {arr[0].number} - </span>
        <span>{arr[0].value}</span>
      </>
    ) : (
      <span className='textGrey'>Текущей задачи нет</span>
    );
  const textPause = <span className='textGrey'>Перерыв</span>;
  return timeBreak ? textPause : textValue;
}
