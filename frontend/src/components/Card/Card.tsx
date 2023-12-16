import { NavLink, useLocation } from "react-router-dom";
import style from './Card.module.css';
import { useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { addFav, removeFav } from "../Redux/actions";
import React, { useState, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../Redux/reducer";
import store from "../Redux/store";

interface CardProps {
   id: number;
   name: string;
   species: string;
   status: string;
   gender: string;
   origin: {name: string};
   image: string;
   onClose: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({ id, name, status, species, gender, origin, image, onClose }) => {
   const location = useLocation().pathname;
   const [isFav, setIsFav] = useState<Boolean>(false);
   const myFavorites = useSelector((state: any) => state.myFavorites)
   const userId = useSelector((state: any) => state.userId)
   const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = store.dispatch;
   const handleFavorite = () => {
      if (isFav === true) {
         setIsFav(false);
        dispatch(removeFav({id, userId}))
      } else {
         setIsFav(true);
         dispatch(addFav({userId, id, name, status, species, gender, origin, image }))
      }
   }
   useEffect(() => {
      myFavorites.forEach((fav: {id: number}) => {
         if (fav.id === id) {
            setIsFav(true)
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
