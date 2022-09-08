import React from "react";
import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      link: ref.current.value,
    });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="new-avatar"
      form="avatar"
      title="Новый аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label new-avatar__form-label">
        <input
          ref={ref}
          id="avatar-input"
          className="popup__input new-avatar__form-input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        ></input>
        <span className="popup__error new-avatar__form-error avatar-input-error"></span>
      </label>
      <button className="new-avatar__form-submit popup__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
