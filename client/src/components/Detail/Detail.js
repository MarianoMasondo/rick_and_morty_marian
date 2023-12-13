import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("There are no characters with this ID!");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  return (
    <div className={`${styles.container} ${styles.backgroundImageContainer}`}>
      <div className={styles.cardContainer}>
        <Link to="/home" className={styles.detailButton}>
          <button>Home</button>
        </Link>
        <div className="characterImage">
          <img
            className={styles.characterImage}
            src={character.image}
            alt={character.name}
          />
        </div>

        <div className={styles.detailContainer}>
          <h3>Name: </h3>
          <p>{character.name}</p>
          <h3>Origin: </h3>
          <p>{character.origin?.name}</p>
          <h3>Species: </h3>
          <p>{character.species}</p>
          <h3>Gender: </h3>
          <p>{character.gender}</p>
        </div>
      </div>
    </div>
  );
}
