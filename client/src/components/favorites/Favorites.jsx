import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../card/Card';
import styles from './Favorites.module.css';
import { removeFav } from '../../redux/actions';

export default function Favorites() {
  console.log("Favorites component rendering");
  const myFavorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();

  const onClose = (id, removeFromHome) => {
    dispatch(removeFav(id));
    if (removeFromHome) {
      console.log(`Removing from home: ${id}`);
    }
  };

  console.log("Favorites component rendering");

  return (
    <div className={styles.favContainer}>
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
          onClose={() => onClose(character.id, false)}
        />
      ))}
    </div>
  );
}


