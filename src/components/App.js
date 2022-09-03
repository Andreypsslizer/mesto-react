import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setselectedCard] = React.useState(null)

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false)
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setselectedCard(null)
  }

  function handleCardClick(card) {
    setselectedCard(card)
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      />
      <Footer />
      <PopupWithForm 
      name='edit' 
      form='profile' 
      title='Редактировать профиль' 
      isOpen={isEditProfilePopupOpen} 
      onClose={closeAllPopups}>
        <label className="popup__label">
          <input id="name-input" className="popup__input edit__input-name" type="text" name="name" placeholder="Имя"
            minLength="2" maxLength="40" required></input>
          <span className="popup__error name-input-error"></span>
        </label>
        <label className="popup__label"><input id="job-input" className="popup__input edit__input-job" type="text" name="job"
            placeholder="Должность" minLength="2" maxLength="200" required></input>
          <span className="popup__error job-input-error"></span>
        </label>
        <button className="edit__form-submit popup__button" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm 
      name='new-item' 
      form='card' 
      title='Новое место' 
      isOpen={isAddPlacePopupOpen} 
      onClose={closeAllPopups}>
        <label className="popup__label">
          <input id="title-input" className="popup__input new-item__input-name" type="text" name="name"
            placeholder="Название" minLength="2" maxLength="30" required></input>
          <span className="popup__error title-input-error"></span>
        </label>
        <label className="popup__label"><input id="link-input" className="popup__input new-item__input-link" type="url"
            name="link" placeholder="Ссылка на картинку" required></input>
          <span className="popup__error link-input-error"></span>
        </label>
        <button className="new-item__form-submit popup__button popup__button_disabled" type="submit" disabled>Создать</button>
      </PopupWithForm>
      <PopupWithForm 
      name='new-avatar' 
      form='avatar' 
      title='Новый аватар' 
      isOpen={isEditAvatarPopupOpen} 
      onClose={closeAllPopups}>
      <label className="popup__label new-avatar__form-label"><input id="avatar-input" className="popup__input new-avatar__form-input-link" type="url"
            name="link" placeholder="Ссылка на картинку" required></input>
          <span className="popup__error new-avatar__form-error avatar-input-error"></span>
        </label>
        <button className="new-avatar__form-submit popup__button popup__button_disabled" type="submit" disabled>Сохранить</button>
      </PopupWithForm>
      <PopupWithForm 
      name='deletion' 
      form='#' 
      title='Вы уверены?' 
      onClose={closeAllPopups}>
        <button className="popup__button popup__deletion-submit" type="submit">Да</button>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
