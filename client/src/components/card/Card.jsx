import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card(props) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorite = props.myFavorites.some(
      (fav) => fav.id === props.id
    );

    setIsFav(favorite);
  }, [props.myFavorites, props.id]);

  const handleFavorite = () => {
    if (isFav) {
      props.removeFav(props.id);
    } else {
      props.addFav(props);
    }

    setIsFav(!isFav);
  };

  const handleClose = () => {
    props.onClose(props.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.favoriteButton}
          onClick={handleFavorite}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {props.showCloseButton && (
          <button
            className={styles.closeButton}
            onClick={handleClose}
          >
            ✕
          </button>
        )}
      </div>

      <Link
        to={`/detail/${props.id}`}
        className={styles.cardLink}
      >
        <div className={styles.dataContainer}>
          <h2>{props.name}</h2>

          <img
            src={props.image}
            alt={props.name}
          />

          <div className={styles.h4Container}>
            <h4 className={styles.infoItem}>
              <span>ID</span>
              {props.id}
            </h4>

            <h4 className={styles.infoItem}>
              <span>Status</span>
              {props.status}
            </h4>

            <h4 className={styles.infoItem}>
              <span>Species</span>
              {props.species}
            </h4>

            <h4 className={styles.infoItem}>
              <span>Gender</span>
              {props.gender}
            </h4>

            <h4 className={styles.infoItem}>
              <span>Origin</span>
              {props.origin?.name || props.origin}
            </h4>
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
