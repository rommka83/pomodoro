import React from 'react';
import './instruction.css';

export function Instruction() {
  return (
    <div className='instruction'>
      <h3 className='instruction__title'>Ура! Теперь можно начать работать:</h3>
      <ul className='instruction__list'>
        <li className='instruction__item'>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className='instruction__item'>Запустите таймер («помидор»)</li>
        <li className='instruction__item'>
          Работайте пока «помидор» не прозвонит
        </li>
        <li className='instruction__item'>
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className='instruction__item'>
          Продолжайте работать «помидор» за «помидором», пока задача не будут
          выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>
    </div>
  );
}
