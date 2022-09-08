import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import React from "react";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setselectedCard] = useState(null);
  const [currentUser, setcurrentUser] = useState(false);
  const [loader, setLoader] = useState(false)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => console.log(`Error: ${err}`));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCardAdd(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error: ${err}`));
    } else {
      api
        .likeCardDel(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`Error: ${err}`));
    }
  }

  function handleDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  useEffect(() => {
    setLoader(true)
    api
      .getUserInfo()
      .then((user) => {
        setcurrentUser(user);
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        setLoader(false)
      });
  }, []);

  function handleUpdateUser(data) {
    api
      .setUser(data)
      .then((userInfo) => {
        setcurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleUpdateAvatar(data) {
    api
      .avatarChange(data)
      .then((newAvatar) => {
        setcurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleAddCard(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setselectedCard(null);
  }

  function handleCardClick(card) {
    setselectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDelete}
          onLoad={loader}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateAvatar}
        />
        <PopupWithForm
          name="deletion"
          form="#"
          title="Вы уверены?"
          onClose={closeAllPopups}
        >
          <button
            className="popup__button popup__deletion-submit"
            type="submit"
          >
            Да
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
