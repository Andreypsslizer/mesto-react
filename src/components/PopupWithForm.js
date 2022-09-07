export default function PopupWithForm(props) {
    return (
      <section className={`popup ${props.name} ${props.isOpen ? `popup_opened`: ""}`}>
        <div className={`${props.name}__form`}>
          <h3 className="popup__title">{props.title}</h3>
          <button className="popup__close-btn" type="button" onClick={props.onClose} />
          <form action="#" name={`${props.form}`} className="popup__form" onSubmit={props.onSubmit} noValidate>
            {props.children}
          </form>
        </div>
      </section>
    )
}
