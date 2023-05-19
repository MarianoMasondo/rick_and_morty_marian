import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from "./components/About/About.jxs";
import Cards from './components/cards/Cards.jsx';
import Detail from "./components/Detail/Detail.jxs";
import Form from "./components/Form/Form.jsx";
import Nav from './components/nav/Nav.jsx';


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
   }, [access]);

   const onSearch = id => { // 2 => { id: 2 }
      axios (`https://rickandmortyapi.com/api/character/${id}`)
         .then(({ data }) => {
            // console.log(data);
            if (data.name) {
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

   const location = useLocation();
   // console.log(location);

   return (
      <div className='App'>
         {
            location.pathname !== "/"
            ? <Nav onSearch={onSearch}/>
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
         </Routes>
         
      </div>
   );
}

export default App;

// import React, { useState } from 'react';
// import './App.css';
// import Cards from './components/cards/Cards.jsx';
// import Nav from './components/nav/Nav';
// import axios from 'axios';
// //import characters from './data.js';

// function App() {
//    const[characters, setCharacters] = useState([])

//    const onSearch = id => { // 2 => { id: 2 }
//       axios (`https://rickandmortyapi.com/api/character/${id}`)
//          .then(({ data }) => {
//             if (data.name) {
//                setCharacters((oldChars) => [...oldChars, data]);
//             } else {
//                window.alert('¡No hay personajes con este ID!');
//             }
//          });
//    }

//    const onClose = id => {
//       setCharacters(characters.filter(caracter =>
//          caracter.id !== Number(id)))
//    }

//    // function onSearch(character) {
//    //    fetch (`http://rickandmortyapi.com/api/character/${character}`)
//    //    .then((response) => response.json())
//    //    .then((data) => {
//    //       if(data.name){
//    //          setCharacters((oldChars) => [...oldChars, 
//    //          data]);            
//    //       } else {
//    //          window.alert("No hay personajes con ese ID");
//    //       }
//    //    })
//    // }

//    // const onClose = id => {
//    //    setCharacters(characters.filter(char => char.id !== id));
//    // }
    
//    return (
//       <div className='App' style={{padding:"25px"}}>
//          <div>
//             <Nav onSearch = {onSearch} />
//          </div>
//          <hr/>
//             <Cards characters={characters} onClose={onClose}/>
//          <hr/>         
//       </div>
//    );
// }

// export default App;
