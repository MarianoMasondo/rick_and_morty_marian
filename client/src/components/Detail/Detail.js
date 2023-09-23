import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { Link } from 'react-router-dom';

export default function Detail(props) {
    const { id } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
            if (data.name) {
                setCharacter(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
        });
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

            <img className={styles.characterImage} src={character.image} alt={character.name} />
  </div>
  <div class="textContainer">

            <div className={styles.textContainer}>
                <h1>DETAIL</h1>
                <label>Name:</label>
                <h2>{character.name}</h2>
                <label>Origin:</label>
                <h3>{character.origin?.name}</h3>
                <label>Species:</label>
                <h3>{character.species}</h3>
                <label>Gender:</label>
                <h3>{character.gender}</h3>
            </div>
  </div>
        </div>
        </div>
    )
}
