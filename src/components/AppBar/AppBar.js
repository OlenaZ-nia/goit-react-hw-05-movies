import { NavLink } from 'react-router-dom';
import s from './AppBar.module.css';


export default function Appbar() {
  
  return (
    <>
    <header className={s.header}>
        <nav className={s.nav}>
          <ul className={ s.navList}>
            <li><NavLink exact to='/'  className={s.link}> Home page</NavLink></li>
            <li><NavLink to='/movies' className={s.link}>Movies</NavLink></li>
          </ul>
        </nav>
    </header>
      </>
  );
}