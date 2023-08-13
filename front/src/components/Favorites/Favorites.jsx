import {connect, useDispatch} from 'react-redux';
import Card from '../Card/Card';
import { filterCards, orderCards } from '../Redux/actions';
import { useState } from 'react';
import style from './Favorites.module.css'

export const Favorites = ({myFavorites}) => {
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
        <div>
            <select className={style.button} onChange={handleOrder} name="" id="">
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <select className={style.button} onChange={handleFilter} name="" id="">
                <option value="AllCharacters">All Characters</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
            </select>
            {myFavorites?.map(charFav => {
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
            })}
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        myFavorites: state.myFavorites
    }
}

export default connect(mapStateToProps, null)(Favorites)