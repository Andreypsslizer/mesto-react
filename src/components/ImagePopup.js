export default function ImagePopup(props) {
    return (
      <section className={`popup element-image-popup ${props.card ? `popup_opened`: ""}`}>
        <div className="element-image-popup__container">
          <button className="popup__close-btn" type="button" onClick={props.onClose} />
          <img className="element-image-popup__image" src={props.card !== null ? props.card.link : ''} alt={props.card !== null ? props.card.name : ''} />
          <h3 className="element-image-popup__title">{props.card !== null ? props.card.name : ''}</h3>
        </div>
      </section>
    )
}