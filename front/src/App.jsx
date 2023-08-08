import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import { useState} from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { useEffect } from 'react';
import Favorites from './components/Favorites/Favorites';

//const URL_BASE = 'https://rym2-production.up.railway.app/api/character';
//const API_KEY = 'key=henrym-jcutisaca';

function App() {
   const [characters, setCharacters] = useState([]);

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const EMAIL = 'Lucas.soldierty@gmail.com';
   const PASSWORD = 'Soldier98';
   const login = (userData) => {
      if(userData.email === EMAIL && userData.password === PASSWORD) {
         setAccess(true);
         navigate('/home');
      }
   }
   const logout = () => {
      setAccess(false);
      navigate('/');
    };

   const onSearch = (id) => {
      axios(`https://rym2-production.up.railway.app/api/character/${id}?key=henrym-jcutisaca`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }
   
   const onClose = (id) => {
      setCharacters(characters.filter(character => character.id !== Number(id)))
   }
   
   const location = useLocation().pathname;
   
   useEffect(() => {
      if(!access) {
      navigate('/');
      } else if(access === true) {
         navigate('/home')
      }
   },[access]);
   return (
      <div className='App'>
         {location !== '/' && <Nav onSearch={onSearch}/>}
         <Routes>
            <Route path='/' element={<Form login={login} logout={logout}/>}></Route>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose}/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/detail/:id' element={<Detail/>}></Route>
            <Route path='/favorites' element={<Favorites/>}></Route>
         </Routes>
      </div>
   );
}

export default App;
