import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from"./Detail.module.css";

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
            <img className={styles.characterImage} src={character.image} alt={character.name} />
            <div className={styles.textContainer}>
            <h1>DETAIL</h1>
            <h2>Name   | {character.name}</h2>
            <h3>Origin | {character.origin?.name}</h3>
            <h3>Specie | {character.species}</h3>
            <h3>Gender | {character.gender}</h3>
            </div>
        </div>
    )
}