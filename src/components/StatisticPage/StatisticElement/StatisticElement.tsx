import React, { ReactNode } from 'react';
import './statisticelement.css';

interface IStatisticElement {
  className?: string;
  title: string;
  content: string;
  img: ReactNode;
}

export function StatisticElement({
  className,
  title,
  content,
  img,
}: IStatisticElement) {
  return (
    <div className={`stEl ${className}`}>
      <h3 className='stEl__title'>{title}</h3>
      <p className='stEl__content'>{content}</p>
      <div className='stEl__img'>{img}</div>
    </div>
  );
}
