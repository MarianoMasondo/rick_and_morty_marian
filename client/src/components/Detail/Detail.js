// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import styles from "./Detail.module.css";
// import { Link } from "react-router-dom";

// export default function Detail() {
//   const { id } = useParams();
//   const [character, setCharacter] = useState({});

//   useEffect(() => {
//     axios(`https://rickandmortymarian-production.up.railway.app/rickandmorty/character/${id}`).then(
//       ({ data }) => {
//         if (data.name) {
//           setCharacter(data);
//         } else {
//           window.alert("There are no characters with this ID!");
//         }
//       }
//     );
//     return setCharacter({});
//   }, [id]);

//   return (
//     <div className={`${styles.container} ${styles.backgroundImageContainer}`}>
//       <div className={styles.cardContainer}>
//         <Link to="/home" className={styles.detailButton}>
//           <button>Home</button>
//         </Link>
//         <div className="characterImage">
//           <img
//             className={styles.characterImage}
//             src={character.image}
//             alt={character.name}
//           />
//         </div>

//         <div className={styles.detailContainer}>
//           <h3>Name: </h3>
//           <p>{character.name}</p>
//           <h3>Origin: </h3>
//           <p>{character.origin?.name}</p>
//           <h3>Species: </h3>
//           <p>{character.species}</p>
//           <h3>Gender: </h3>
//           <p>{character.gender}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import Card from "../card/Card.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Cards({ characters, onClose }) {
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    // Obtén los datos del personaje para cada ID en la matriz de personajes
    const fetchData = async () => {
      const dataPromises = characters.map(async (id) => {
        const response = await axios.get(`/rickandmorty/character/${id}`);
        return response.data;
      });

      const characterData = await Promise.all(dataPromises);
      setCharacterData(characterData);
    };

    fetchData();
  }, [characters]);

  const cardsContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  return (
    <div style={cardsContainer}>
      {characterData.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin?.name}
          image={character.image}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
