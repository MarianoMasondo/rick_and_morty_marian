import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import About from "./components/About/About";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form.jsx";
import Nav from "./components/nav/Nav.jsx";
import Favorites from "./components/favorites/Favorites";
import { useDispatch } from "react-redux";
import { logout as logoutRedux } from "./redux/actions.js";

function App() {
  const [characters, setCharacters] = useState(() => {
    const savedCharacters = localStorage.getItem("homeCharacters");
    return savedCharacters ? JSON.parse(savedCharacters) : [];
  });

  const [access, setAccess] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userData) => {
    try {
      const { email, password } = userData;

      const { data } = await axios(
        `/rickandmorty/login/?email=${email}&password=${password}`
      );

      setAccess(data.access);
      localStorage.setItem("access", data.access);

      if (data.access) {
        navigate("/home");
      } else {
        window.alert("Email o password incorrectos");
      }
    } catch (error) {
      console.log(error.message);
      window.alert("Error al iniciar sesión");
    }
  };

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");

    if (storedAccess === "true") {
      setAccess(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("homeCharacters", JSON.stringify(characters));
  }, [characters]);

  const onSearch = async (id) => {
    try {
      const parsedId = Number(id);

      const characterId = characters.find(
        (character) => character.id === parsedId
      );

      if (characterId) {
        return alert("This character is already on screen!");
      }

      if (parsedId < 1 || parsedId > 826 || !parsedId) {
        return alert("There are no characters with this ID!");
      }

      const { data } = await axios.get(`/rickandmorty/character/${parsedId}`);

      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert("There are no characters with this ID!");
      }
    } catch (error) {
      console.log(error.message);
      window.alert("There are no characters with this ID!");
    }
  };

  const onClose = (id) => {
    setCharacters((oldChars) =>
      oldChars.filter((character) => character.id !== id)
    );
  };

  const generarRandomId = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

  const logout = () => {
    setCharacters([]);
    setAccess(false);

    localStorage.removeItem("access");
    localStorage.removeItem("homeCharacters");
    localStorage.removeItem("myFavorites");

    dispatch(logoutRedux());

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
          <Route
            path="/"
            element={access ? <Navigate to="/home" /> : <Form login={login} />}
          />

          <Route
            path="/home"
            element={
              access ? (
                <div>
                  <Nav
                    onSearch={onSearch}
                    randomCharacter={generarRandomId}
                    logout={logout}
                  />
                  <Cards
                    characters={characters}
                    onClose={onClose}
                    showCloseButton={true}
                  />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/about"
            element={access ? <About /> : <Navigate to="/" />}
          />

          <Route
            path="/detail/:id"
            element={access ? <Detail /> : <Navigate to="/" />}
          />

          <Route
            path="/favorites"
            element={
              access ? (
                <div>
                  <Nav
                    onSearch={onSearch}
                    randomCharacter={generarRandomId}
                    logout={logout}
                  />
                  <Favorites
                    characters={characters}
                    onClose={onClose}
                    showCloseButton={false}
                  />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
