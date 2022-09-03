export default function ImagePopup(props) {
    return (
      <section className={`popup element-image-popup ${props.card ? `popup_opened`: ""}`}>
        <div className="element-image-popup__container">
          <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
          <img className="element-image-popup__image" src={props.card.link} alt={props.card.name}></img>
          <h3 className="element-image-popup__title">{props.card.name}</h3>
        </div>
      </section>
    )
}