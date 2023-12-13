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
  const [characters, setCharacters] = useState(new Set());
  const [access, setAccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCharacters = localStorage.getItem("characters");
    if (storedCharacters) {
      setCharacters(new Set(JSON.parse(storedCharacters)));
    }

    const storedAccess = localStorage.getItem("access");
    if (storedAccess) {
      setAccess(JSON.parse(storedAccess));
    } else {
      if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/favorites"
      ) {
        navigate("/");
      }
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(Array.from(characters)));
    localStorage.setItem("access", JSON.stringify(access));
  }, [characters, access]);

  const clearCards = () => {
    setCharacters(new Set());
  };

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
      if (characters.has(id)) {
        return alert("This character is already on the screen!");
      }

      if (id < 1 || id > 826) {
        return alert("There are no characters with this ID!");
      }

      const { data } = await axios.get(`/rickandmorty/character/${id}`);
      if (data.name) {
        setCharacters(new Set([...characters, id]));
      } else {
        window.alert("There are no characters with this ID!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClose = (id) => {
    const updatedCharacters = new Set(characters);
    updatedCharacters.delete(id);
    setCharacters(updatedCharacters);
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
                <Nav
                  onSearch={onSearch}
                  randomCharacter={generarRandomId}
                  clearCards={clearCards}
                />
                <Cards characters={Array.from(characters)} onClose={onClose} />
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
                  clearCards={clearCards}
                />
                <Favorites
                  characters={Array.from(characters)}
                  onClose={onClose}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
