import { connect, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { filterCards, orderCards } from '../Redux/actions';
import { useState } from 'react';
import style from './Favorites.module.css'
import rickFavorite from '../Images/rickFavorite.mp4'
import MenuBurger from '../MenuBurger/MenuBurger';
import FilterResponsive from '../FilterResponsive/FilterResponsive';

export const Favorites = ({ myFavorites, menuBurger, handleMenuBurger, filterResponsive }) => {

    const [aux, setAux] = useState(false)
    const dispatch = useDispatch();
    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(!aux)
    }
    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }
    return (
        <div className={style.container}>
            <video className={style.video} autoPlay loop>
                <source src={rickFavorite} type="video/mp4" />
            </video>
            <div className={style.containerSelect}>
                <select className={style.button1} onChange={handleOrder} name="" id="">
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>
                <select className={style.button2} onChange={handleFilter} name="" id="">
                    <option value="AllCharacters">All Characters</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
            {menuBurger ? <MenuBurger handleMenuBurger={handleMenuBurger} menuBurger={menuBurger}></MenuBurger> : null}
            <div className={style.containerFilterResponsive}>
                {(!menuBurger && filterResponsive) ? <FilterResponsive></FilterResponsive> : null}
            </div>
            <div className={style.cardsContainer}>
                {!menuBurger ? myFavorites?.map(charFav => {
                    return (
                        <div className={style.cardfav} key={charFav.id}>
                            <Card
                                className={style.card}
                                id={charFav.id}
                                name={charFav.name}
                                status={charFav.status}
                                species={charFav.species}
                                gender={charFav.gender}
                                origin={charFav.origin}
                                image={charFav.image}
                            />
                        </div>
                    )
                })
                    : null}
            </div>
        </div >
    )
}

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps, null)(Favorites)