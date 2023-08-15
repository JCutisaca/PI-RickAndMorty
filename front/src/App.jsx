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
   // const email = 'Lucas.soldierty@gmail.com';
   // const password = 'Soldier98';
   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const {data} = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
            setAccess(data);
            access && navigate('/home');
      } catch (error) {
         console.log(error.message);
      }
   }
   const logout = () => {
      setAccess(false);
      navigate('/');
    };

   const onSearch = async (id) => {
      try {
         const {data} = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if (data.name) {
                  setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         window.alert('¡No hay personajes con este ID!');
      }
      // axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
      //    if (data.name) {
      //       setCharacters((oldChars) => [...oldChars, data]);
      //    } else {
      //       window.alert('¡No hay personajes con este ID!');
      //    }
      // });
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
