import { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar(props) {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setId(value);
  };

  const handleSearch = () => {
    props.onSearch(id);
    setId("");
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Insert Id number..."
        value={id}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Add ID</button>
    </div>
  );
}
