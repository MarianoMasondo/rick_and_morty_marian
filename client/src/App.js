import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nav from "./components/nav/Nav.jsx";
import Form from "./components/Form/Form.jsx";
import Cards from "./components/cards/Cards.jsx";
import Favorites from "./components/favorites/Favorites";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import axios from "axios";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Resetear los estados cuando la ruta es exactamente "/"
    if (location.pathname === "/") {
      setCharacters([]);
      setAccess(false);
    }
  }, [location.pathname]);

  const login = async (userData) => {
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
  };

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

  const generarRandomId = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

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
