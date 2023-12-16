import style from './Cards.module.css'
import { Card } from '../Card/Card';
import MenuBurger from '../MenuBurger/MenuBurger';
import portalRick from '../Images/portalRick.jpg';
import React from 'react';

interface CardsProps {
   menuBurger: boolean;
   handleMenuBurger: () => void;
   characters: Array<{
      id: number;
      name: string;
      status: string;
      species: string;
      gender: string;
      origin: {name: string};
      image: string
   }>;
   onClose: (id: number) => void;
}

const Cards: React.FC<CardsProps> = ({ menuBurger, handleMenuBurger, characters, onClose }) => {

   return (<div className={style.container}>
      <img className={style.video} src={portalRick} alt="" />
      {menuBurger ? <MenuBurger handleMenuBurger={handleMenuBurger}></MenuBurger> : null}
      <div className={style.cardsContainer}>
         {!menuBurger ? characters.map(({ id, name, status, species, gender, origin, image }) => {
            return (
               <div className={style.card} key={id}>
                  <Card
                     key={id}
                     id={id}
                     name={name}
                     status={status}
                     species={species}
                     gender={gender}
                     origin={origin}
                     image={image}
                     onClose={onClose}
                  />
               </div>
            )
         }) : null}
      </div>
   </div>);
}


export default Cards;