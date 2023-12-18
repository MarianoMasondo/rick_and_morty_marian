import React from 'react';
import Card from '../card/Card';
import styles from './Favorites.module.css';

export default function Favorites({ characters, onClose, showCloseButton }) {

  return (
    <div className={styles.favContainer}>
      {characters.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin}
          image={character.image}
          onClose={() => onClose(character.id)}
          showCloseButton={showCloseButton}
        />
      ))}
    </div>
  );
}



