import React from "react";
import { api } from "./Api";
import Card from "./Card";

function Main(props) {
    const [userName, setuserName] = React.useState('Жак Ив Кусто')
    const [userDescription, setuserDescription] = React.useState('Исследователь океана')
    const [userAvatar, setuserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo().then(user => {
            setuserName(user.name)
            setuserDescription(user.about)
            setuserAvatar(user.avatar)
        })
        api.getInitialCards().then(card => {
            setCards(card)
        }).catch(err => console.log(`Error: ${err}`))
    }, []);

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
          <picture className="profile__avatar-wrapper" onClick={props.onEditAvatar}><img src={userAvatar} alt="" className="profile__avatar" /></picture>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-btn" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          <ul className="elements__list">
          {cards.map((card, i) => (
              <Card 
              key={i} 
              card={card} 
              onCardClick={props.onCardClick}/>
          ))}
          </ul>
        </section>
      </main>
    );
}

export default Main