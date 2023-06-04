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
   const EMAIL = "ejemplo@gmail.com";
   const PASSWORD = "123456";

   const navigate = useNavigate();

   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access, navigate]);

   const onSearch = id => { 
      axios (`http://localhost:3001/rickandmorty/character/${id}`)
         .then(({ data }) => {
            if (data.name) {
            const isDuplicate = characters.some((char) => char.id === data.id);
             if (isDuplicate) {
              window.alert('¡Este personaje ya está en pantalla!');
             } else                
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         });
   }

   const onClose = id => {
      setCharacters(characters.filter(caracter =>
         caracter.id !== Number(id)))
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
