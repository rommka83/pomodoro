import React from 'react';
import './header.css';
import { Logo } from './Logo';
import { Statistics } from './Statistics';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className='header'>
      <div className='container header-wrapper'>
        <Link to='/'>
          <Logo />
        </Link>
        <Link to='/statistics'>
          <Statistics />
        </Link>
      </div>
    </header>
  );
}
