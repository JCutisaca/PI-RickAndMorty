import { NavLink, useLocation } from "react-router-dom";
import style from './Card.module.css';
import {connect} from 'react-redux'
import { addFav, removeFav } from "../Redux/actions";
import { useState, useEffect } from "react";

export function Card({id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) {
   const location = useLocation().pathname;
   const [isFav, setIsFav] = useState(false);
   const handleFavorite = () => {
      if(isFav === true) {
         setIsFav(false);
         removeFav(id)
      } else {
         setIsFav(true);
         addFav({id, name, status, species, gender, origin, image})
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
         {
         isFav 
         ? (
            <button onClick={handleFavorite}>❤️</button>
         ) : (
            <button onClick={handleFavorite}>🤍</button>
            )
         }
          {location !== '/favorites' && <button onClick={() => onClose(id)}>X</button>}
         <NavLink to={`/detail/${id}`}>
         <h2>{name}</h2>
         </NavLink>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img className={style.image} src={image} alt='' />
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
