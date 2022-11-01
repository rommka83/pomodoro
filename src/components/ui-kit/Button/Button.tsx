import React from 'react';
import './button.css';

type Style = 'green' | 'red';

interface IBtn {
  styleBtn: Style;
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  styleBtn,
  text,
  className,
  onClick,
  disabled = false,
}: IBtn) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${styleBtn} ${className}`}
    >
      {text}
    </button>
  );
}
