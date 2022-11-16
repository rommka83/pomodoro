/* eslint-disable array-callback-return */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '../../ui-kit/Button';
import './formnewtask.css';
import { useRecoilState } from 'recoil';
import { taskArr, ITasks } from '../../../state/taskArr';
import { nanoid } from 'nanoid';
import { formValue } from '../../../state/formValue';

export function FormNewTask() {
  const [data, setData] = useRecoilState(taskArr);
  const [{ value, idChangeableTask }, setValue] = useRecoilState(formValue);

  const inp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (idChangeableTask !== '' && inp.current !== null) {
      inp.current.focus();
    }
  }, [idChangeableTask]);

  function taskAdded(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newTask = {
      id: nanoid(),
      number: data.tasks.length + 1,
      amountPomodoro: 1,
      value: value,
    };
    if (value !== '') {
      if (idChangeableTask !== '') {
        const newTasks = data.tasks.map((task) => {
          if (task.id === idChangeableTask) {
            return (task = { ...task, value: value });
          } else {
            return task;
          }
        });
        setData((oldTask) => {
          return { ...oldTask, tasks: newTasks };
        });
        setValue(() => {
          return { value: '', idChangeableTask: '' };
        });
      } else {
        setData((oldTask: ITasks) => {
          return { ...oldTask, tasks: [...oldTask.tasks, newTask] };
        });
        setValue(() => {
          return { value: '', idChangeableTask: '' };
        });
      }
    } else {
      alert('В очереди не должно быть пустых задач!');
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setValue((oldValue) => {
      return {
        value: event.target.value,
        idChangeableTask: oldValue.idChangeableTask,
      };
    });
  }

  return (
    <form className='formnewtask' onSubmit={taskAdded}>
      <input
        type='text'
        placeholder='Название задачи'
        className='formnewtask__input'
        onChange={handleInput}
        value={value}
        ref={inp}
      />
      <Button styleBtn='green' text='Добавить' />
    </form>
  );
}
