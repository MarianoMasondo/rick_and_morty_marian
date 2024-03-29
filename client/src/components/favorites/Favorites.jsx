import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../card/Card';
import styles from './Favorites.module.css';
import { removeFav } from '../../redux/actions';

export default function Favorites() {
  const myFavorites = useSelector((state) => state.myFavorites);
  const dispatch = useDispatch();

  const onClose = (id, removeFromHome) => {
    dispatch(removeFav(id));
    if (removeFromHome) {
      console.log(`Removing from home: ${id}`);
    }
  };
  
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
          showCloseButton={false}
          onClose={() => onClose(character.id, false)}
        />
      ))}
    </div>
  );
}


