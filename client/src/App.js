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
  const [access, setAccess] = useState(() => {
    return JSON.parse(localStorage.getItem("access")) || false;
  });
  const navigate = useNavigate();

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "/rickandmorty/login/";
      const { access } = (
        await axios(URL + `?email=${email}&password=${password}`)
      ).data;
      setAccess(access);
      if (access) {
        setCharacters([]);
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    localStorage.setItem("access", JSON.stringify(access));
    !access && navigate("/");
  }, [access, navigate]);

  const onSearch = async (id) => {
    try {
      // ...
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

  const logout = () => {
    localStorage.removeItem("access");
    setCharacters([]);
    setAccess(false);
    navigate("/");
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
                <Nav
                  onSearch={onSearch}
                  randomCharacter={generarRandomId}
                  logout={logout}
                />
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
                <Nav
                  onSearch={onSearch}
                  randomCharacter={generarRandomId}
                  logout={logout}
                />
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

