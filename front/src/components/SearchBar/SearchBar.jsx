import style from './SearchBar.module.css';
import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
   const [id, setId] = useState('');
   
   const handleChange = (event) => {
      setId(event.target.value)
   }
   const characterUnfound = () => {
      if (Number(id) > 826) {
         alert("The entered ID does not exist.");
      }
   };

   const handleEnter = (event) => {
      if(event.keyCode === 13) {
         onSearch(id)
         setId('')
      }
   }

   return (
      <div>
         <input onKeyDown={handleEnter} placeholder='Enter ID (1-826)..' className={style.buttonInput} type='search' onChange={handleChange} value={id} onBlur={characterUnfound} />
         <button className={style.button} onClick={() => {
            onSearch(id);
            setId('')
         }
         }>Search Id</button>
      </div>
   );
}
