import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const userContext = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === userContext._id;
  const isLiked = props.card.likes.some((i) => i._id === userContext._id);
  const cardLikeButtonClassName = `element__group_active`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handlelike() {
    props.onCardLike(props.card);
  }

  function cardDelete() {
    props.onCardDelete(props.card);
  }
  return (
    <li className="element">
      {isOwn && (
        <button className="element__trash" onClick={cardDelete}></button>
      )}
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      ></img>
      <div className="element__inf">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__like">
          <button
            type="button"
            className={
              isLiked
                ? `element__like-group ${cardLikeButtonClassName}`
                : `element__like-group`
            }
            onClick={handlelike}
          />
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </li>
  );
}
