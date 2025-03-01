const TeachersCard = ({ teacher }) => {
  const { name, languages, lessonsDone, rating, price } = teacher;

  return (
    <li>
      <img src="/placeholder.jpg" alt={name} width="50" height="50" />
      <div>
        <h3>{name}</h3>
        <p>Speaks: {languages.join(", ")}</p>
        <p>Lessons done: {lessonsDone}</p>
        <p>Rating: {rating} ⭐</p>
        <p>Price: {price}$ / hour</p>
        <button>Read more</button>
        <button>♡</button>
      </div>
    </li>
  );
};

export default TeachersCard;
