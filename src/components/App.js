import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from './CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false)
  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false)
  const [isAddPlaceOpen, setAddPlaceOpen] = React.useState(false)
  const [isConfirmTrashOpen, setConfirmTrashOpen] = React.useState(false)
  const [isPreviewOpen, setPreviewOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})

  React.useEffect(() => {
    api.getProfileInfo()
      .then((info) => {
        setCurrentUser(info);
      })
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setPreviewOpen(true)
  }

  function handleUpdateUser(userInfo) {
    api.saveProfile(userInfo)
      .then(data => {
        setCurrentUser(data)
      })
      .then(closeAllPopups())
      .catch(err => `Unable to save profile: ${err}`)
  }

  function handleUpdateAvatar({ avatar }) {
    api.saveAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
      })
      .then(closeAllPopups())
      .catch(err => `Unable to save avatar: ${err}`)
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
    <div className='page'>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick} 
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
      
      <Footer />

      <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <EditProfilePopup isOpen={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <PopupWithForm isOpen={isAddPlaceOpen} name='card' title='New place' onClose={closeAllPopups} buttonText='Create'>
        <input
          type='text'
          name='name'
          id='place'
          className='modal__input'
          placeholder='Title'
          minLength='1'
          maxLength='30'
          required
        />
        <span className='modal__input-error modal__input-error_place'></span>
        <input
          type='url'
          name='link'
          id='image'
          className='modal__input'
          placeholder='Image link'
          required
        />
        <span className='modal__input-error modal__input-error_image'></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isConfirmTrashOpen} name='trash' title='Are you sure?' onClose={closeAllPopups} buttonText='Yes' />
      </CurrentUserContext.Provider>

      <ImagePopup isOpen={isPreviewOpen} onClose={closeAllPopups} card={selectedCard} />
    </div>
  )
}

export default App
