import { useDispatch } from 'react-redux';
import { Card } from '../Card/Card';
import { filterCards, orderCards } from '../Redux/actions';
import { useState } from 'react';
import style from './Favorites.module.css'
import MenuBurger from '../MenuBurger/MenuBurger';
import FilterResponsive from '../FilterResponsive/FilterResponsive';
import portalRick from '../Images/portalRick.jpg'
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/reducer';

type FavoritesProps = {
    menuBurger: boolean;
    handleMenuBurger: () => void;
    filterResponsive: boolean;
    onClose: (id: number) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ menuBurger, handleMenuBurger, filterResponsive, onClose }) => {

    const [aux, setAux] = useState<boolean>(false);
    const myFavorites = useSelector((state: RootState) => state.myFavorites)
    const dispatch = useDispatch();
    const handleOrder = (event: { target: { value: string; }; }) => {
        dispatch(orderCards(event.target.value))
        setAux(!aux)
    }
    const handleFilter = (event: { target: { value: string; }; }) => {
        dispatch(filterCards(event.target.value))
    }

    type charactersProps = {
        id: number;
        name: string;
        species: string;
        status: string;
        gender: string;
        origin: {name: string};
        image: string;
     };

    return (
        <div className={style.container}>
            <img src={portalRick} className={style.video} />
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
            {menuBurger ? <MenuBurger handleMenuBurger={handleMenuBurger} ></MenuBurger> : null}
            <div className={style.containerFilterResponsive}>
                {(!menuBurger && filterResponsive) ? <FilterResponsive></FilterResponsive> : null}
            </div>
            <div className={style.cardsContainer}>
                {!menuBurger ? myFavorites?.map((charFav: charactersProps) => {
                    return (
                        <div className={style.cardfav} key={charFav.id}>
                            <Card
                                // className={style.card}
                                id={charFav.id}
                                name={charFav.name}
                                status={charFav.status}
                                species={charFav.species}
                                gender={charFav.gender}
                                origin={charFav.origin}
                                image={charFav.image}
                                onClose={onClose}
                            />
                        </div>
                    )
                })
                    : null}
            </div>
        </div >
    )
}