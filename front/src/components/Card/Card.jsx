import { NavLink, useLocation } from "react-router-dom";
import style from './Card.module.css';
import { connect } from 'react-redux'
import { addFav, removeFav } from "../Redux/actions";
import { useState, useEffect } from "react";

export function Card({ id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites }) {
   const location = useLocation().pathname;
   const [isFav, setIsFav] = useState(false);
   const handleFavorite = () => {
      if (isFav === true) {
         setIsFav(false);
         removeFav(id)
      } else {
         setIsFav(true);
         addFav({ id, name, status, species, gender, origin, image })
      }
   }
   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={style.card}>
         <div className={style.screen}>
            {
               isFav
                  ? (
                     <button className={style.favorite} onClick={handleFavorite}>❤️</button>
                  ) : (
                     <button className={style.favorite} onClick={handleFavorite}>🤍</button>
                  )
            }
            {location !== '/favorites' && <button className={style.close} onClick={() => onClose(id)}>❌</button>}
            <NavLink to={`/detail/${id}`}>
               <img className={style.image} src={image} alt='' />
            </NavLink>
            <h2 className={style.name}>{name}</h2>
         </div>
      </div>
   );
}

export function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites
   }
}

export function mapDispatchToProps(dispatch) {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
