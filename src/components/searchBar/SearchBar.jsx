import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
   const [id, setId] = useState("");

   const handleChange = event => {
      const {value} = event.target;
      setId(value);
      console.log("id: ", id);
   }

   return (
      <div className={styles.container}>
         <input
            type="text"
            name="search"
            id="search"
            onChange={handleChange}
         />
         <button onClick={() => props.onSearch(id)}>Agregar</button>
      </div>
   );
}


// import styles from './SearchBar.module.css';
// import { useState } from "react";

// export default function SearchBar(props) {

//    const [character, setCharacter] = useState("");

//    const handleChange = event => {

//       const {value} = event.target;
//          setCharacter(value);
//    }
   
//    return (
//       <div className = {styles.container}>
//          <input 
//                type="search"
//                 name="search"
//                 id="search"
//                 onChange={handleChange}
//                 />
//          <button onClick={() => props.onSearch(character)}>Agregar</button>
//       </div>
//    );
// }
