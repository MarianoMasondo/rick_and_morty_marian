import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { addFav, removeFav } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

function Card(props) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorite = props.myFavorites.some((fav) => fav.id === props.id);

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
        <button className={styles.favoriteButton} onClick={handleFavorite}>
          {isFav ? "❤️" : "🤍"}
        </button>

        {props.showCloseButton && (
          <button className={styles.closeButton} onClick={handleClose}>
            ✕
          </button>
        )}
      </div>

      <Link to={`/detail/${props.id}`} className={styles.cardLink}>
        <div className={styles.dataContainer}>
          <h2 className={styles.cardTitle} title={props.name}>
            {props.name}
          </h2>

          <img src={props.image} alt={props.name} />

          <div className={styles.h4Container}>
            <h4 className={styles.infoItem}>
              <span>ID</span>
              <strong>{props.id}</strong>
            </h4>

            <h4 className={styles.infoItem}>
              <span>Status</span>
              <strong>{props.status}</strong>
            </h4>

            <h4 className={styles.infoItem}>
              <span>Species</span>
              <strong>{props.species}</strong>
            </h4>

            <h4 className={styles.infoItem}>
              <span>Gender</span>
              <strong>{props.gender}</strong>
            </h4>

            <h4 className={styles.infoItem}>
              <span>Origin</span>
              <strong title={props.origin?.name || props.origin}>
                {props.origin?.name || props.origin}
              </strong>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);