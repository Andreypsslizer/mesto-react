export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }
    return(
        <li className="element">
          <button className="element__trash"></button>
          <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}></img>
          <div className="element__inf">
            <h3 className="element__title">{props.card.name}</h3>
            <div className="element__like">
              <button type="button" className="element__like-group" />
              <span className="element__like-counter">{props.card.likes.length}</span>
            </div>
          </div>
        </li>
    );
}