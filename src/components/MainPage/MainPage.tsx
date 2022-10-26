import React from 'react';
import { Instruction } from './Instruction';
import './mainpage.css';
import { FormNewTask } from './FormNewTask/FormNewTask';
import { ListTask } from './ListTask';
import { Timer } from './Timer';

export function MainPage() {
  return (
    <main className='main container mainpage'>
      <Instruction />
      <FormNewTask />
      <ListTask />
      <Timer />
    </main>
  );
}
