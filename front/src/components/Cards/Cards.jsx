import style from './Cards.module.css'
import Card from "../Card/Card";
import portal from '../Images/Portal.mp4'

export default function Cards({characters, onClose}) {



   
   return (<div className={style.container}>
      <video className={style.video} autoPlay loop>
        <source src={portal} type="video/mp4" />
      </video>
         {characters.map(({id, name, status, species, gender, origin, image}) => {
            return (
            <div className={style.card} key={id}>
            <Card
            key = {id}
            id = {id}
            name = {name}
            status = {status}
            species = {species}
            gender = {gender}
            origin = {origin.name}
            image = {image}
            onClose={onClose}
            />
            </div>
         )
      })}
   </div>);
}
