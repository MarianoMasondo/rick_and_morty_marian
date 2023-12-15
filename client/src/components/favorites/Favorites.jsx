import React, { useState } from 'react';
import Card from '../card/Card';
import styles from './Favorites.module.css';

export default function Favorites() {
  // Usamos useState para manejar el estado local
  const [myFavorites, setMyFavorites] = useState([]);

  // Función para quitar de favoritos
  const onRemoveFromFavorites = (id) => {
    setMyFavorites((prevFavorites) => prevFavorites.filter((character) => character.id !== id));
  };

  return (
    <div className={styles.favContainer}>
      {/* Renderizamos la lista de favoritos */}
      {myFavorites.map((character, index) => (
        <Card
          key={index}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin}
          image={character.image}
          onClose={() => onRemoveFromFavorites(character.id)}
        />
      ))}
    </div>
  );
}



