import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import About from "./components/About/About";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx";
import Nav from "./components/nav/Nav.jsx";
import Favorites from "./components/favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState(() => {
    const storedCharacters = localStorage.getItem('characters');
    return storedCharacters ? JSON.parse(storedCharacters) : [];
  });

  const [access, setAccess] = useState(() => {
    const storedAccess = localStorage.getItem('access');
    return storedAccess ? JSON.parse(storedAccess) : false;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("currentLocation", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('access', JSON.stringify(access));
    // Almacenar el estado de characters solo cuando la página se recarga y hay tarjetas
    if (!access && characters.length > 0) {
      localStorage.setItem('characters', JSON.stringify(characters));
    }
    !access && navigate("/");
  }, [access, characters, navigate]);

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "/rickandmorty/login/";
      const { access } = (
        await axios(URL + `?email=${email}&password=${password}`)
      ).data;
      setAccess(access);
      if (access) {
        // Limpiar characters al iniciar sesión solo si no hay tarjetas
        if (characters.length === 0) {
          setCharacters([]);
        }
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSearch = async (id) => {
    try {
      const characterId = characters.find((character) => character.id === id);
      if (characterId) {
        return alert("This character is already on screen!");
      }
      if (id < 1 || id > 826) {
        return alert("There are no characters with this ID!");
      }
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

  const logout = () => {
    setAccess(false);
    localStorage.removeItem('access');
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


