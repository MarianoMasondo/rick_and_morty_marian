import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";
import { logout } from "../../redux/actions.js";
import { connect } from "react-redux";

// Componente funcional Nav
const Nav = (props) => {
  const handleLogout = () => {
    props.logout(); // Usa la acción directamente desde las props
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavLink to="/home">
          <button>Home</button>
        </NavLink>
        <NavLink to="/favorites">
          <button>Favorites</button>
        </NavLink>
        <NavLink to="/home">
          <button onClick={props.randomCharacter}>Random</button>
        </NavLink>
      </div>
      <div className={styles.center}>
        <SearchBar onSearch={props.onSearch} />
      </div>
      <div className={styles.right}>
        <NavLink to="/about">
          <button>About</button>
        </NavLink>
        <NavLink to="/" onClick={handleLogout}>
          <button>Logout</button>
        </NavLink>
      </div>
    </div>
  );
};

// Mapea el estado de Redux a las props del componente
const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
    allCharacters: state.allCharacters,
    // Mapea aquí cualquier parte del estado que necesites en tu componente
  };
};

// Mapea las acciones de Redux a las props del componente
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()), // Mapea la acción de logout
  };
};

// Conecta el componente a Redux
export default connect(mapStateToProps, mapDispatchToProps)(Nav);

