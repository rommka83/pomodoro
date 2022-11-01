import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../../ui-kit/Button';
import './formnewtask.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { taskArr, ITasks } from '../../../state/atoms';
import { nanoid } from 'nanoid';

export function FormNewTask() {
  const [data, setData] = useRecoilState(taskArr);
  const [value, setValue] = useState('');

  function taskAdded(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTask = {
      id: nanoid(),
      number: data.tasks.length + 1,
      amountPomodoro: 2,
      value: value,
    };
    if (value !== '') {
      setData((oldTask: ITasks) => {
        let arrTasks = [...oldTask.tasks, newTask];
        let newTasks = {
          amountPomodoroComplited: oldTask.amountPomodoroComplited,
          timer: oldTask.timer,
          littleBreak: oldTask.littleBreak,
          bigBreak: oldTask.bigBreak,
          tasks: arrTasks,
        };
        return newTasks;
      });
      setValue('');
    } else {
      alert('В очереди не должно быть пустых задач!');
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <form className='formnewtask' onSubmit={taskAdded}>
      <input
        type='text'
        placeholder='Название задачи'
        className='formnewtask__input'
        onChange={handleInput}
        value={value}
      />
      <Button styleBtn='green' text='Добавить' />
    </form>
  );
}
