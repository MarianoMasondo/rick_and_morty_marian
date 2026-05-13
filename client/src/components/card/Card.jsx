import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card(props) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    props.myFavorites.forEach((fav) => {
      if (fav.id === props.id) {
        setIsFav(true);
      }
    });
  }, [props.myFavorites, props.id]);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      props.removeFav(props.id);
    } else {
      setIsFav(true);
      props.addFav(props);
    }
  };

  const handleClose = () => {
    props.onClose(props.id, props.showCloseButton);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {isFav ? (
          <button onClick={handleFavorite}>❤️</button>
        ) : (
          <button onClick={handleFavorite}>🤍</button>
        )}
        {props.showCloseButton && (
          <button onClick={handleClose}>X</button>
        )}
      </div>
      <Link to={`/detail/${props.id}`}>
        <div className={styles.h4Container}>
  <h4 className={styles.infoItem}>
    <span>ID:</span> {props.id}
  </h4>

  <h4 className={styles.infoItem}>
    <span>Status:</span> {props.status}
  </h4>

  <h4 className={styles.infoItem}>
    <span>Species:</span> {props.species}
  </h4>

  <h4 className={styles.infoItem}>
    <span>Gender:</span> {props.gender}
  </h4>

  <h4 className={styles.infoItem}>
    <span>Origin:</span> {props.origin}
  </h4>
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
