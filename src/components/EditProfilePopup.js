import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleSetName(evt) {
    setName(evt.target.value);
  }

  function handleSetDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      profile_name: name,
      profile_job: description,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name={"edit"}
      form={"profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="name-input"
          className="popup__input edit__input-name"
          type="text"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleSetName}
          required
        ></input>
        <span className="popup__error name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          id="job-input"
          className="popup__input edit__input-job"
          type="text"
          name="job"
          placeholder="Должность"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleSetDescription}
          required
        ></input>
        <span className="popup__error job-input-error"></span>
      </label>
      <button className="edit__form-submit popup__button" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}
