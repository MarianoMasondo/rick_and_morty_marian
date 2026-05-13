import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleSearch = () => {
    if (!id.trim()) return;

    props.onSearch(id);
    setId("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          name="search"
          id="search"
          placeholder="Elegir ID (1-826)..."
          value={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className={styles.button} onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
}
