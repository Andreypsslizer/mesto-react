import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSetName(evt) {
    setName(evt.target.value);
  }

  function handleSetLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="new-item"
      form="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="title-input"
          className="popup__input new-item__input-name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleSetName}
          required
        ></input>
        <span className="popup__error title-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          id="link-input"
          className="popup__input new-item__input-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleSetLink}
          required
        />
        <span className="popup__error link-input-error"></span>
      </label>
      <button className="new-item__form-submit popup__button" type="submit">
        Создать
      </button>
    </PopupWithForm>
  );
}
