// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Card from '../card/Card';
// import styles from './Favorites.module.css';
// import { removeFav } from '../../redux/actions';

// export default function Favorites() {
//   const myFavorites = useSelector((state) => state.myFavorites);
//   const dispatch = useDispatch();

//   const onClose = (id, removeFromHome) => {
//     dispatch(removeFav(id));
//     if (removeFromHome) {
//       console.log(`Removing from home: ${id}`);
//     }
//   };
  
//   return (
//     <div className={styles.favContainer}>
//       {myFavorites.map((character, index) => (
//         <Card
//           key={index}
//           id={character.id}
//           name={character.name}
//           status={character.status}
//           species={character.species}
//           gender={character.gender}
//           origin={character.origin}
//           image={character.image}
//           onClose={() => onClose(character.id, false)}
//         />
//       ))}
//     </div>
//   );
// }
import React, { useState } from "react";
import Card from "../card/Card";
import styles from "./Favorites.module.css";
import Nav from "../nav/Nav";

export default function Favorites() {
  // Estado local inicializado con un array vacío
  const [myFavoritesLocal, setMyFavoritesLocal] = useState([]);

  const onClose = (id, removeFromHome) => {
    // Lógica para eliminar un favorito del estado local
    const updatedFavorites = myFavoritesLocal.filter(
      (character) => character.id !== id
    );
    setMyFavoritesLocal(updatedFavorites);

    if (removeFromHome) {
      console.log(`Removing from home: ${id}`);
    }
  };

  // Función para resetear el estado local
  const resetMyFavoritesLocal = () => {
    setMyFavoritesLocal([]);
  };

  return (
    <div className={styles.favContainer}>
      {myFavoritesLocal.map((character, index) => (
        <Card
          key={index}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin}
          image={character.image}
          onClose={() => onClose(character.id, false)}
        />
      ))}
      {/* Pasamos la función de reseteo al componente de navegación */}
      <Nav resetMyFavoritesLocal={resetMyFavoritesLocal} />
    </div>
  );
}

// Otros importes y lógica necesarios para el componente Navigation...



