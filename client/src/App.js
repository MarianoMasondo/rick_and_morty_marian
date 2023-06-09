import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from "./components/About/About";
import Cards from './components/cards/Cards.jsx';
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx";
import Nav from './components/nav/Nav.jsx';
import Favorites from './components/favorites/Favorites';


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
   }, [access, navigate]);

   const onSearch = async id => { 
      try {
         const characterId = characters.filter(character => character.id === id);
         if(characterId.length) return alert("¡Este personaje ya está en pantalla!");
         if(id < 1 || id > 826) return alert("¡No hay personajes con este ID!")
         const { data} = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`);
         if(data.name){
            setCharacters((oldChars) => [...oldChars, data]);            
         }else {
            window.alert('¡No hay personajes con este ID!');
         }         
      } catch (error) {
         console.log(error.message);         
      }
   }
      
   //    axios (`http://localhost:3001/rickandmorty/character/${id}`)
   //       .then(({ data }) => {
   //          if (data.name) {
   //          const isDuplicate = characters.some((char) => char.id === data.id);
   //           if (isDuplicate) {
   //            window.alert('¡Este personaje ya está en pantalla!');
   //           } else                
   //          } else {
   //             window.alert('¡No hay personajes con este ID!');
   //          }
   //       });
   // }

   const onClose = id => {
      setCharacters(characters.filter(caracter =>
         caracter.id !== id))
   }

   function generarRandomId () {
      const randomId = Math.floor(Math.random() * 826) + 1;
      onSearch(randomId)
   }

   const location = useLocation();
   
   return (
      <div className='App'>
         {
            location.pathname !== "/"
            ? <Nav onSearch={onSearch} randomCharacter={generarRandomId} />
            : null
         }
         <hr />
         <Routes>
            <Route exact path="/" element={<Form login={login} />} />
            <Route path="/home" element={
               <Cards characters={characters} onClose={onClose} />
            }/>
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/Favorites" element={<Favorites onClose={onClose} />} />
         </Routes>
         
      </div>
   );
}

export default App;
