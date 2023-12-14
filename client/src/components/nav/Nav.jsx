import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";
import { logout } from "../../redux/actions.js";
import { useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
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
          <button>Random</button>
        </NavLink>
      </div>
      <div className={styles.center}>
        <SearchBar />
      </div>
      <div className={styles.right}>
        <NavLink to="/about">
          <button>About</button>
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
