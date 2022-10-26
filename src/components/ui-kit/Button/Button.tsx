import React from 'react';
import './button.css';

type Style = 'green' | 'red';

interface IBtn {
  styleBtn: Style;
  text: string;
  className?: string;
}

export function Button({ styleBtn, text, className }: IBtn) {
  return <button className={`btn ${styleBtn}`}>{text}</button>;
}
