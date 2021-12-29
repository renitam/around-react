function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return(
    <article className="card">
      <button
        type="button"
        className="card__trash link"
        aria-label="trash button"
      ></button>
      <img 
        src={props.card.link ? props.card.link : "https://memegenerator.net/img/instances/60573683.jpg"}  
        alt={`${props.card.name}`} 
        className="card__image" 
        onClick={handleClick}
      />
      <div className="card__info-wrapper">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button
            type="button"
            className="card__like"
            aria-label="like button"
          ></button>
          <p className="card__like-num">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;