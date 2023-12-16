import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './Detail.module.css'
import MenuBurger from "../MenuBurger/MenuBurger";
import portalRick from '../Images/portalRick.jpg'

type DetailProps = {
   handleMenuBurger: () => void;
   menuBurger: boolean;
}

const Detail: React.FC<DetailProps> = ({ handleMenuBurger, menuBurger }) => {
   const { id } = useParams();

   type charactersProps = {
      id: number;
      name: string;
      species: string;
      status: string;
      gender: string;
      origin: {name: string};
      image: string;
   };
   const [characters, setCharacter] = useState<charactersProps | null >();

   useEffect(() => {
      axios(`/rickAndMorty/character/${id}/`).then(({ data }) => {
         if (data.name) {
            setCharacter(data);
         } else {
            window.alert('No characters with that ID');
         }
      });
      return setCharacter(null);
   }, [id]);

   return (
      <div className={style.container}>
         {menuBurger ? <MenuBurger handleMenuBurger={handleMenuBurger}></MenuBurger> : null}
         <div>
            <img src={portalRick} className={style.video} alt="" />
            {!menuBurger ? <div className={style.newContainer}>
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