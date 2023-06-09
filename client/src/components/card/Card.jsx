import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { addFav, removeFav } from "../../redux/actions"; 
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
 

function Card(props) {
   const { myFavorites, addFav, removeFav } = props;

   const [isFav, setIsFav] = useState(false);

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === props.id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
        removeFav(props.id)
      }else{
         setIsFav(true);
         addFav(props)
      }
   };
   
   return (
      <div className={styles.container}>
         <div className={styles.buttonContainer}>
         {
         isFav ? (
            <button onClick={handleFavorite}>❤️</button>
         ) : (
            <button onClick={handleFavorite}>🤍</button>
            )
         }
            <button onClick={() => props.onClose(props.id)}>X</button>
         </div>
         <Link to={`/detail/${props.id}`}>
         <div className={styles.dataContainer}>
            <h2>{props.name}</h2>
         <img src={props.image} alt='Imagen' />
            <h4>Status: {props.status}</h4>
            <h4>Species: {props.species}</h4>
            <h4>Gender: {props.gender}</h4>
            <h4>Origin: {props.origin}</h4>
            <h3>ID: {props.id}</h3>
         </div>
         </Link>
      </div>
   );
};

const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return{
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id))
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);