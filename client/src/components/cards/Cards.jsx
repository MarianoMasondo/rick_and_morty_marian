import Card from "../card/Card.jsx";

export default function Cards({ characters, onClose, showCloseIcon }) {
  const cardsContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };
  return (
    <div style={cardsContainer}>
      {characters.map((character) => (
        <Card
          key={character.id}
          id={character.id}
          name={character.name}
          status={character.status}
          species={character.species}
          gender={character.gender}
          origin={character.origin?.name}
          image={character.image}
          onClose={() => onClose(character.id)}
          showCloseIcon={showCloseIcon}
        />
      ))}
    </div>
  );
}
