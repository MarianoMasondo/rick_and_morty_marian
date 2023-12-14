import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const [id, setId] = useState("");
  const [placeholder, setPlaceholder] = useState("Number Id...");

  const handleChange = (event) => {
    const { value } = event.target;
    setId(value);
  };

  const handleSearch = () => {
    props.onSearch(id);
    setId("");
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 768) {
        setPlaceholder("Number Id...");
      } else {
        setPlaceholder("Number Id...");
      }
    };

    updatePlaceholder();

    window.addEventListener("resize", updatePlaceholder);

    return () => {
      window.removeEventListener("resize", updatePlaceholder);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder={placeholder}
          value={id}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Add ID</button>
      </div>
    </div>
  );
}
