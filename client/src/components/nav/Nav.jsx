// Nav.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Nav(props) {
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
        <button onClick={() => { props.logout(); props.onClose(); }}>Logout</button>
      </div>
    </div>
  );
}

