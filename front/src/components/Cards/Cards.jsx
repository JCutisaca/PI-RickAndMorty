import style from './Cards.module.css'
import Card from "../Card/Card";

export default function Cards({characters, onClose}) {
   return (<div>
         {characters.map(({id, name, status, species, gender, origin, image}) => {
            return (
            <div key={id} className={style.container}>
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
