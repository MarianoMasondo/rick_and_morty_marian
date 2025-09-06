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
import { removeFav } from "./redux/actions.js";
import { useDispatch } from "react-redux";

function App() {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "/rickandmorty/login/";
      const { access } = (
        await axios(URL + `?email=${email}&password=${password}`)
      ).data;
      localStorage.setItem('access', access);
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
    navigate("/home");
  }, [access, navigate]);

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

  const onClose = (id, removeFromHome) => {
    setCharacters((oldChars) => oldChars.filter((character) => character.id !== id));

    if (removeFromHome) {
      dispatch(removeFav(id));
    }
  };
  

  const generarRandomId = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    onSearch(randomId);
  };

  const logout = () => {
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
          {/* <Route exact path="/" element={<Form login={login} />} /> */}
          <Route
            path="/home"
            element={
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
                <Favorites characters={characters} onClose={onClose} showCloseButton={false} />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
