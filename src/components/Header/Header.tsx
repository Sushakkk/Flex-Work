import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Функция для закрытия меню
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');

    if (isMenuOpen) {
      body.classList.add('lock');
      burger?.classList.add('active');
      menu?.classList.add('active');
    } else {
      body.classList.remove('lock');
      burger?.classList.remove('active');
      menu?.classList.remove('active');
    }
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header__container _container">
        <Link to="/" className="header__logo">flexwork</Link>

        {/* Бургер-меню для мобильных экранов */}
        <div className="header__burger" onClick={toggleMenu}>
          <span></span>
        </div>

        <nav className={`header__menu menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="menu__list" onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('menu__link')) {
              closeMenu();
            }
          }}>
            <li className="menu__item">
              <Link 
                to="/activities" 
                className="menu__link menu__link_active" 
              >
                Деятельности
              </Link>
            </li>
            {/* Дополнительные ссылки */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
