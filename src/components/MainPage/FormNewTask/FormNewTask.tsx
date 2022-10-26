import React from 'react';
import { Button } from '../../ui-kit/Button';
import './formnewtask.css';

export function FormNewTask() {
  return (
    <form className='formnewtask'>
      <input
        type='text'
        placeholder='Название задачи'
        className='formnewtask__input'
      />
      <Button styleBtn='green' text='Добавить' />
    </form>
  );
}
