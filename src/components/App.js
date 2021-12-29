import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [isConfirmTrashOpen, setConfirmTrashOpen] = React.useState(false);
  const [isPreviewOpen, setPreviewOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setPreviewOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false)
    setEditProfileOpen(false)
    setAddPlaceOpen(false)
    setConfirmTrashOpen(false)
    setPreviewOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick} 
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />
      <Footer />

      <PopupWithForm isOpen={isEditAvatarOpen} name="avatar" title="Change profile picture" onClose={closeAllPopups}>
        <input
          type="url"
          name="link"
          id="avatar"
          className="modal__input"
          placeholder="Image link"
          minLength="1"
          required
        />
        <span className="modal__input-error modal__input-error_avatar"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isEditProfileOpen} name="profile" title="Edit profile" onClose={closeAllPopups}>
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="modal__input-error modal__input-error_name"></span>
        <input
          type="text"
          name="about"
          id="about"
          className="modal__input"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="modal__input-error modal__input-error_about"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isAddPlaceOpen} name="card" title="New place" onClose={closeAllPopups} buttonText="Create">
        <input
          type="text"
          name="name"
          id="place"
          className="modal__input"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
        />
        <span className="modal__input-error modal__input-error_place"></span>
        <input
          type="url"
          name="link"
          id="image"
          className="modal__input"
          placeholder="Image link"
          required
        />
        <span className="modal__input-error modal__input-error_image"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isConfirmTrashOpen} name="trash" title="Are you sure?" onClose={closeAllPopups} buttonText="Yes" />

      <ImagePopup isOpen={isPreviewOpen} onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
