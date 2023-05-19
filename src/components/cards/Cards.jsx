import Card from '../card/Card.jsx';

export default function Cards({characters, onClose}) {
   const cardsContainer = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
   }

   console.log(characters);
   return (
      <div style={cardsContainer}>
         {
            characters.map(character => (
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
}

// import Card from '../card/Card';

// export default function Cards({characters,}) {   
//    return (
//    <div style={{display: 'flex', justifyContent: 'space-between'}}>
//       {characters.map(character => ( 
//          <Card
//          key={character.id}
//          name={character.name}
//          status={character.status}
//          species={character.species}
//          gender={character.gender}
//          origin={character.origin.name}
//          image={character.image}
//          onClose={() => props.onClose(character.id)}
//          />))}
//    </div>);
// }
