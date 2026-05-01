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

function App() {
  const [characters, setCharacters] = useState([]);
  const [ access, setAccess] = useState(false);
  const navigate = useNavigate();

  const login = async (userData) => {
  try {
    const { email, password } = userData;

    const { data } = await axios(
      `/rickandmorty/login/?email=${email}&password=${password}`
    );

    setAccess(data.access);
    localStorage.setItem("access", data.access);

    if (data.access) {
      setCharacters([]);
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
