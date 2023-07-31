import style from './Nav.module.css'
import SearchBar from "../SearchBar/SearchBar";
import { NavLink } from 'react-router-dom';

const Nav = ({onSearch, logout}) => {
    const randomId = Math.ceil(Math.random() * 826);
    return (
        <nav className={style.nav}>
            <NavLink to={('/home')}>
            <button className={style.button}>Home</button>
            </NavLink>
            <SearchBar onSearch={onSearch}/>
            <button className={style.button} onClick={() => {
            onSearch(randomId)}
            }>Id Random</button>
            <NavLink to={('/about')}>
            <button className={style.button}>About</button>
            </NavLink>
            <NavLink to={('/favorites')}>
            <button className={style.button}>Favorites</button>
            </NavLink>
            <NavLink to={('/')}>
            <button logout={logout} className={style.button}>Logout</button>
            </NavLink>
        </nav>
    )
}

export default Nav;