import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Nav(props) {


    
    return(
        <div className={styles.container}>
            <div>
               <NavLink to="/home">
                <button>Home</button>
               </NavLink>
               <NavLink to="/favorites">
                <button>Favorites</button>
               </NavLink>
               <NavLink to="/about">
                <button>About</button>
                </NavLink>
                
            </div>
            <div>
                <SearchBar onSearch={props.onSearch} />
                <button onClick={props.randomCharacter}>Ramdom</button>
            </div>
                
        </div>        
    )
}