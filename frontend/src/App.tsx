import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Cards from './components/Cards/Cards';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import { Favorites } from './components/Favorites/Favorites';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from './components/Redux/actions';

interface Character {
   id: number;
   name: string;
   status: string;
   species: string;
   gender: string;
   origin: {name: string};
   image: string;
}

function App() {
   const [characters, setCharacters] = useState<Character[]>([]);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const login = async (userData: { email: string, password: string }): Promise<void> => {
      try {
         const { email, password } = userData;
         const URL = '/rickAndMorty/user/login/';
         const { data } = await axios.post(URL, {email, password})
         const { access, userId } = data;
         setAccess(data);
         dispatch(loginUser(userId))
         access && navigate('/home');
      } catch (error: any) {
         window.alert(error.response.data.message)
      }
   }
   const logout = (): void => {
      setAccess(false);
      dispatch(logoutUser())
      setCharacters([])
      navigate('/');
   };

   const onSearch = async (id: string) => {
      try {
         const findCharacter = characters.some(character => character.id === +id)
         if (findCharacter) return window.alert('Character already exists')
         const { data } = await axios(`/rickAndMorty/character/${id}`);
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         window.alert("There are no characters with this ID!");
      }
   }
   const onSearchRandom = async (): Promise<void> => {
      let randomId = Math.ceil(Math.random() * 826);
      let findCharacter = characters.some(character => character.id === randomId)
      if (findCharacter && characters.length < 826) {
         while (findCharacter) {
            randomId = Math.ceil(Math.random() * 826);
         }
      }
      try {
         const { data } = await axios(`/rickAndMorty/character/${randomId}`);
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         }
      } catch (error) {
         window.alert("There are no characters with this ID!");
      }
   }

   const onClose = (id: number): void => {
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

   const [menuBurger, setMenuBurger] = useState<boolean>(false);
   const [filterResponsive, setFilterResponsive] = useState<boolean>(false);
   const handleMenuBurger = (): void => {
      setMenuBurger(!menuBurger)
   }
   const handleFilterResponsive = (): void => {
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
            logout={logout}
            onSearch={onSearch} />}
         <Routes>
            <Route path='/' element={<Form login={login} logout={logout}  />}></Route>
            <Route path='/home' element={<Cards menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} characters={characters} onClose={onClose} />}></Route>
            <Route path='/about' element={<About menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
            <Route path='/detail/:id' element={<Detail menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
            <Route path='/favorites' element={<Favorites filterResponsive={filterResponsive} onClose={onClose} menuBurger={menuBurger} handleMenuBurger={handleMenuBurger} />}></Route>
         </Routes>
      </div>
   );
}

export default App;
