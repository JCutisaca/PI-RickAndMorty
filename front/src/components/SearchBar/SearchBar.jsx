import style from './SearchBar.module.css';
import { useState } from "react";

export default function SearchBar({onSearch}) {
   const [id, setId] = useState('');
   const handleChange = (event) => {
      setId(event.target.value)
   }
   const characterUnfound = () => {
      if (Number(id) > 826) {
        alert('No existe el id ingresado');
      }
    };
   return (
      <div>
         <input className={style.buttonInput} type='search' onChange={handleChange} value={id} onBlur={characterUnfound}/>
         <button className={style.button} onClick={() => {
            onSearch(id); 
            setId('')}
            }>Agregar</button>
      </div>
   );
}
