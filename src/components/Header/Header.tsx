
import './Header.css'
import { Link } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Header = () => {
  return (
    
    <header className="header">
      <div className="header__container _container">
        

        <Link 
                        to={"/"}
                        className="header__logo"
                    >flexwork</Link>
        <div className="header__burger">
          <span></span>
        </div>
        <Breadcrumbs />
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <Link id="MainLink" to={"/activities"} className="menu__link menu__link_active">Деятельности</Link>
            </li>
            {/* <li className="menu__item">
              <a id="ServicesLink" href="#services" className="menu__link">Услуги</a>
            </li> */}
            {/* <li className="menu__item">
              <a href="#contacts" className="menu__link">Вход</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
