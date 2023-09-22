import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './Detail.module.css'
import MenuBurger from "../MenuBurger/MenuBurger";
import portalRick from '../Images/portalRick.jpg'


const Detail = ({handleMenuBurger, menuBurger}) => {
   const { id } = useParams();
   const [characters, setCharacter] = useState({});
   useEffect(() => {
      axios(`/rickandmorty/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacter(data);
         } else {
            window.alert('No characters with that ID');
         }
      });
      return setCharacter({});
   }, [id]);

   return (
      <div className={style.container}>
            {menuBurger? <MenuBurger handleMenuBurger={handleMenuBurger}></MenuBurger> : null}
         <div>
            <img src={portalRick} className={style.video} alt="" />
            {!menuBurger? <div className={style.newContainer}>
               <div className={style.left}>
                  <div className={style.cardContainer}>
                  <img className={style.image} src={characters?.image} alt={characters?.name} />
                  <h2 className={style.name}>{characters?.name}</h2>
                  </div>
               </div>
               <div className={style.right}>
                  <div className={style.detailContainer}>
                     <label htmlFor="">Status: </label>
                  <h3>{characters?.status}</h3>
                  <label htmlFor="">Gender: </label>
                  <h3>{characters?.gender}</h3>
                  <label htmlFor="">Specie: </label>
                  <h3>{characters?.species}</h3>
                  <label htmlFor="">Origin: </label>
                  <h3>{characters?.origin?.name}</h3>
                  </div>
               </div>
            </div> : null}
         </div>
      </div>
   )
}

export default Detail;