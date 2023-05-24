import { connect } from "react-redux";
import Card from "../card/Card";
import styles from "./Favorites.module.css";

function Favorites({myFavorites, onClose}) {
       
    return (
       <div style={styles.cardsContainer}>
          {
             myFavorites.map(character => (
                <Card
                   key={character.id}
                   id={character.id}
                   name={character.name}
                   status={character.status}
                   species={character.species}
                   gender={character.gender}
                   origin={character.origin?.name}
                   image={character.image}
                   onClose={onClose}
                />
             ))
          }
       </div>
    );
 };

 const mapStateToProps = (state) => {
    return {
        myFavorites: state.myFavorites
    }
 };

 export default connect(mapStateToProps,null)(Favorites);