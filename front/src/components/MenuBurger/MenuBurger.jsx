import style from './MenuBurger.module.css'
import { NavLink, useNavigate } from 'react-router-dom';

const MenuBurger = ({ menuBurger, handleMenuBurger, handleMenuFalse }) => {
    return (
        <div className={style.menuBurger}>
            <div className={style.buttons}>
                <NavLink to={"/home"} onClick={() => {
                    handleMenuBurger()
                    return
                }} className={style.tags}><h3>Home</h3></NavLink>
                <NavLink onClick={handleMenuBurger} to={"/favorites"} className={style.tags}><h3>Favorites</h3></NavLink>
                <NavLink onClick={handleMenuBurger} className={style.tags} to={"/"}><h3>Logout</h3></NavLink>
                <NavLink onClick={handleMenuBurger} className={style.tags} to={"/about"}><h3>About</h3></NavLink>
            </div>
        </div>
    )
}

export default MenuBurger;