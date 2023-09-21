import './App.css';
import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { useEffect } from 'react';
import Favorites from './components/Favorites/Favorites';

function App() {
   const [characters, setCharacters] = useState([]);

   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const URL = '/rickandmorty/login/';
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;
         setAccess(data);
         access && navigate('/home');
      } catch (error) {
         window.alert(error.response.data)
      }
   }
   const logout = () => {
      setAccess(false);
      navigate('/');
   };

   const onSearch = async (id) => {
      try {
         const findCharacter = characters.some(character => character.id === +id)
         if(findCharacter) return window.alert('Character already exists')
         const { data } = await axios(`/rickandmorty/character/${id}`);
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         window.alert("There are no characters with this ID!");
      }
   }
   const onSearchRandom = async () => {
      let randomId = Math.ceil(Math.random() * 826);
      const findCharacter = characters.some(character => character.id === randomId)
      if (findCharacter && characters.length < 826) {
         while (findCharacter) {
            randomId()
         }
      }
      try {
         const { data } = await axios(`/rickandmorty/character/${randomId}`);
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         window.alert("There are no characters with this ID!");
      }
   }

   const onClose = (id) => {
      setCharacters(characters.filter(character => character.id !== Number(id)))
   }

   const location = useLocation().pathname;

   useEffect(() => {
      if (!access) {
         navigate('/');
      } else if (access === true) {
         navigate('/home')
      }
   }, [access]);

   const [menuBurger, setMenuBurger] = useState(false);
   const [filterResponsive, setFilterResponsive] = useState(false)
   const handleMenuBurger = () => {
      setMenuBurger(!menuBurger)
   }
   const handleFilterResponsive = () => {
      setFilterResponsive(!filterResponsive)
   }

   return (
      <div className='App'>
         {location !== '/' && <Nav
            filterResponsive={filterResponsive}
            handleFilterResponsive={handleFilterResponsive}
            menuBurger={menuBurger}
            handleMenuBurger={handleMenuBurger}
            onSearchRandom={onSearchRandom}
            onSearch={onSearch} />}
         <Routes>
            <Route path='/' element={<Form login={login} logout={logout} />}></Route>
            <Route path='/home' element={<Cards menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} characters={characters} onClose={onClose} />}></Route>
            <Route path='/about' element={<About menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
            <Route path='/detail/:id' element={<Detail menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
            <Route path='/favorites' element={<Favorites filterResponsive={filterResponsive} menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
         </Routes>
      </div>
   );
}

export default App;
