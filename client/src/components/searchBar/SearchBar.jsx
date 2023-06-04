import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
   const [id, setId] = useState("");

   const handleChange = event => {
      const {value} = event.target;
      setId(value);      
   }

   const handleSearch = () => {
      props.onSearch(id);
      setId("");
   }

   return (      
      <div className={styles.container}>
         {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/2560px-Rick_and_Morty.svg.png" />  verificar posicón */}
         <input
            type="text"
            name="search"
            id="search"
            placeholder="Ingrese un número..."
            value={id}
            onChange={handleChange}
         />
         <button onClick={(handleSearch)}>Agregar</button>
      </div>
      
   );
}