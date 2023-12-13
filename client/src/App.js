// App.jsx

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./components/About/About";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx";
import Nav from "./components/nav/Nav.jsx";
import Favorites from "./components/favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  // Restaura el estado desde localStorage al cargar la aplicación
  useEffect(() => {
    const storedCharacters = localStorage.getItem('characters');
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }

    const storedAccess = localStorage.getItem('access');
    if (storedAccess) {
      setAccess(JSON.parse(storedAccess));
    } else {
      // Si no hay información de acceso, redirige a la página de inicio
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [navigate]);

  // Guarda el estado en localStorage cada vez que characters o access cambian
  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
    localStorage.setItem('access', JSON.stringify(access));
  }, [characters, access]);

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "/rickandmorty/login/";
      const { access } = (
        await axios(URL + `?email=${email}&password=${password}`)
      ).data;
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSearch = async (id) => {
    try {
      const characterId = characters.filter((character) => character.id === id);
      if (characterId.length)
        return alert("This character is already on screen!");
      if (id < 1 || id > 826)
        return alert("There are no characters with this ID!");
      const { data } = await axios.get(`/rickandmorty/character/${id}`);
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("There are no characters with this ID!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClose = (id) => {
    const isFavorite = characters.some((character) => character.id === id);

    if (isFavorite) {
      setCharacters((oldChars) =>
        oldChars.filter((character) => character.id !== id)
      );
    } else {
      setCharacters(characters.filter((character) => character.id !== id));
    }
  };

  function generarRandomId() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  }

  return (
    <div>
      <div
        className={`Background ${
          window.location.pathname === "/" ? "HomePageBackground" : "background"
        }`}
      />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Form login={login} />} />
          <Route
            path="/home"
            element={
              <div>
                <Nav onSearch={onSearch} randomCharacter={generarRandomId} />
                <Cards characters={characters} onClose={onClose} />
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="/favorites"
            element={
              <div>
                <Nav onSearch={onSearch} randomCharacter={generarRandomId} />
                <Favorites onClose={onClose} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;




