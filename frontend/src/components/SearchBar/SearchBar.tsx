import style from './SearchBar.module.css';
import React, { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (id: string) => void }) {
   const [id, setId] = useState('');
   
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setId(event.target.value)
   }
   const characterUnfound = () => {
      if (Number(id) > 826) {
         alert("The entered ID does not exist.");
      }
   };

   const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
