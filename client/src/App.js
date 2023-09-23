import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import About from "./components/About/About";
import Cards from './components/cards/Cards.jsx';
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx";
import Nav from './components/nav/Nav.jsx';
import Favorites from './components/favorites/Favorites';
import styles from '../src/App.css';


function App() {
   const [characters, setCharacters] = useState([]);
   
   const [access, setAccess] = useState(false);

   const navigate = useNavigate();

   async function login(userData) {
      try {
         const { email, password } = userData;
         const URL = 'http://localhost:3001/rickandmorty/login/';
         const { access } = (await axios(URL + `?email=${email}&password=${password}`)).data;
         setAccess(access);
         access && navigate('/home');         
      } catch (error) {
         console.log(error.message);         
      }
   }

   useEffect(() => {
   !access && navigate('/');
}, [access, navigate]); // Add 'navigate' to the dependency array


   const onSearch = async id => { 
      try {
         const characterId = characters.filter(character => character.id === id);
         if(characterId.length) return alert("This character is already on screen!");
         if(id < 1 || id > 826) return alert("There are no characters with this ID!")
         const {data} = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`);
         if(data.name){
            setCharacters((oldChars) => [...oldChars, data]);            
         }else {
            window.alert('There are no characters with this ID!');
         }         
      } catch (error) {
         console.log(error.message);         
      }
   }

   const onClose = id => {
      setCharacters(characters.filter(caracter =>
         caracter.id !== id))
   }

   function generarRandomId () {
      const randomId = Math.floor(Math.random() * 826) + 1;
      onSearch(randomId)
   }

   
   
   return (
      <div className='App'>
         <Routes>
            <Route exact path="/" element={<Form login={login} />} />
            <Route path="/home" className={styles.homeBackground} element={
               <div>
                  <Nav onSearch={onSearch} randomCharacter={generarRandomId} />
                  <Cards characters={characters} onClose={onClose} />
               </div>
            }/>
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={
               <div>
                  <Nav onSearch={onSearch} randomCharacter={generarRandomId} />
                  <Favorites onClose={onClose} />
               </div>
            } />
         </Routes>
         
      </div>
   );
}

export default App;


