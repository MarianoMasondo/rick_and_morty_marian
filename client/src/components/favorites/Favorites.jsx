import { connect, useSelector} from "react-redux";
import Card from "../card/Card";
import styles from "./Favorites.module.css";
import { removeFav } from "../../redux/actions";

function Favorites(props) {
   const favorites = useSelector(state => state.myFavorites)
   
   const { removeFav } = props;
   const onClose = (id) => { 
      removeFav(id)
    }
   
   return (
      <div style={styles.cardsContainer}>
          {
             favorites.map(character => (
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
   
   export function mapStateToProps(state) {
      return {
         myFavorites: state.myFavorites
      }
   };
 export function mapDispatchToProps(dispatch) {
   return {
     removeFav: (id) => dispatch(removeFav(id))
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Favorites);