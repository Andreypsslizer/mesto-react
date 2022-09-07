import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const userContext = React.useContext(CurrentUserContext)
    const card = props.cards
    
    /* React.useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
        setuserDescription(user.about)
        setuserName(user.name)
        setCurrentUser(user);
        setCards(cards);
      }).catch((err) => {
        console.error(err);
      });
    }, []); */
    return(
      <main className="content">
        <section className="profile">
          <picture className="profile__avatar-wrapper" onClick={props.onEditAvatar}><img src={userContext.avatar} alt="" className="profile__avatar" /></picture>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userContext.name}</h1>
              <button type="button" className="profile__button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
          <button type="button" className="profile__add-btn" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          <ul className="elements__list">
          {card.map((card) => (
              <Card 
              key={card._id} 
              card={card} 
              onCardClick={props.onCardClick}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}/>
          ))}
          </ul>
        </section>
      </main>
    );
}

export default Main