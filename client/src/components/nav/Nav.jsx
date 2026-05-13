import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Nav(props) {
  return (
    <nav className={styles.container}>
      <div className={styles.left}>
        <NavLink to="/home" className={styles.link}>
          <button className={styles.navButton}>Home</button>
        </NavLink>

        <NavLink to="/favorites" className={styles.link}>
          <button className={styles.navButton}>Favoritos</button>
        </NavLink>

        <NavLink to="/home" className={styles.link}>
          <button
            className={styles.navButton}
            onClick={props.randomCharacter}
          >
            Random
          </button>
        </NavLink>
      </div>

      <div className={styles.center}>
        <SearchBar onSearch={props.onSearch} />
      </div>

      <div className={styles.right}>
        <NavLink to="/about" className={styles.link}>
          <button className={styles.navButton}>Acerca de</button>
        </NavLink>

        <button
          className={`${styles.navButton} ${styles.logoutButton}`}
          onClick={props.logout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}