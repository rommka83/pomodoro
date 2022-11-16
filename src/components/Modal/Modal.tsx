import React from 'react';
import ReactDOM from 'react-dom';
import { obj } from '../Icon';
import { Button } from '../ui-kit/Button';
import './modal.css';

interface IModal {
  onClick: () => {};
  close: () => void;
}

export function Modal({ onClick, close }: IModal) {
  const node = document.getElementById('modal-root');

  if (!node) return null;
  return ReactDOM.createPortal(
    <div className='modalBackground'>
      <div className='modalWindow'>
        <h4 className='modalTitle'>Удалить задачу?</h4>
        <Button
          onClick={onClick}
          className='modalDel'
          styleBtn='red'
          text='Удалить'
        />
        <button onClick={close} className='modalExit'>
          {obj.exit}
        </button>
        <button onClick={close} className='modalCancel'>
          Отмена
        </button>
      </div>
    </div>,
    node
  );
}
