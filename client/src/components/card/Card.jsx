import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card(props) {
  const { onClose } = props;

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // Check if props.id is defined before using it
    if (props.id) {
      setIsFav((prevIsFav) => {
        const isFavorite = props.myFavorites.some((fav) => fav.id === props.id);
        console.log(`Character ${props.id} - isFavorite: ${isFavorite}`);
        return isFavorite;
      });
    }
  }, [props.myFavorites, props.id]);
  
  
  // ...
  
  const handleFavorite = () => {
    const { id, addFav, removeFav, onClose } = props;
  
    if (isFav) {
      setIsFav(false);
      removeFav(id);
      onClose(id);
      console.log(`Removed from favorites: ${props.name} (ID: ${id})`);
    } else {
      setIsFav(true);
      // Check if the character is not already in favorites before adding
      const isCharacterInFavorites = props.myFavorites.some((fav) => fav.id === id);
      if (!isCharacterInFavorites) {
        addFav(props);
        console.log(`Added to favorites: ${props.name} (ID: ${id})`);
      }
    }
  };
  
  

  console.log(`Render - Character ${props.id} - isFav: ${isFav}`);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        {props.showCloseIcon && <button onClick={() => onClose(props.id)}>X</button>}
      </div>
      <Link to={`/detail/${props.id}`}>
        <div className={styles.dataContainer}>
          <h2>{props.name}</h2>
          <img src={props.image} alt="Imagen" />
          <h3>ID: {props.id}</h3>
          <h4>Status: {props.status}</h4>
          <h4>Species: {props.species}</h4>
          <h4>Gender: {props.gender}</h4>
          <h4>Origin: {props.origin}</h4>
        </div>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFav: (character) => dispatch(addFav(character)),
    removeFav: (id) => dispatch(removeFav(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
