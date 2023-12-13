import React from "react";
import { connect } from "react-redux";
import Card from "../card/Card";
import styles from "./Favorites.module.css";
import { removeFav } from "../../redux/actions";

function Favorites({ myFavorites, removeFav }) {
  const onClose = (id, removeFromHome) => {
    removeFav(id);
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
          onClose={() => onClose(character.id, false)}
        />
      ))}
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    myFavorites: state.myFavorites,
  };
}


export function mapDispatchToProps(dispatch) {
  return {
    removeFav: (id) => dispatch(removeFav(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

