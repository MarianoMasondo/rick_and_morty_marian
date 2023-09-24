import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { Link } from "react-router-dom";

export default function Detail(props) {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setCharacter({});
  }, [id]);

  console.log("character desde Detail: ", character);
  return (
    <div className={`${styles.container} ${styles.backgroundImageContainer}`}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <div className={styles.cardContainer}>
        <div class="characterImage">
          <img
            className={styles.characterImage}
            src={character.image}
            alt={character.name}
          />
        </div>

        <div className={styles.textContainer}>
          <h1>DETAIL</h1>
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
