import React from 'react';
import './header.css';
import { Logo } from './Logo';
import { Statistics } from './Statistics';

export function Header() {
  return (
    <header className='header'>
      <div className='container header-wrapper'>
        <Logo />
        <Statistics />
      </div>
    </header>
  );
}
