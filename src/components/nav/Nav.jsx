import React from "react";
import SearchBar from "../searchBar/SearchBar.jsx";

export default function Nav(props) {
    return(
        <div>
            <SearchBar onSearch={props.onSearch} />
        </div>
    )
}

// import SearchBar from "../searchBar/SearchBar.jsx";
// import styles from './Nav.module.css';

// export default function Nav(props) {
   
//    return (
//       <div className = {styles.container}>
//          <SearchBar onSearch = {props.onSearch} />
//       </div>
//    );
// }