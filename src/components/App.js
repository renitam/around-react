import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import ImagePopup from './ImagePopup'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false)
  const [isConfirmTrashOpen, setIsConfirmTrashOpen] = React.useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cardList, setIsCardList] = React.useState([])

  // Load in profile info and initial cards.
  React.useEffect(() => {
    api.getProfileInfo()
      .then((info) => {
        setCurrentUser(info)
      })
      .catch(err => `Unable to load profile info: ${err}`)
  }, [])

  React.useEffect(() => {
    api.getCards()
    .then( (initialCards) => {
      setIsCardList([...initialCards])
    })
    .catch(err => `Unable to load cards: ${err}`)
  }, [])

  // Define edit profile/avatar modals and api calls
  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true)
  }

  function handleUpdateUser(userInfo) {
    api.saveProfile(userInfo)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditProfileOpen(false))
      .catch(err => `Unable to save profile: ${err}`)
  }

  function handleUpdateAvatar({ avatar }) {
    api.saveAvatar(avatar)
      .then(data => {
        setCurrentUser(data)
      })
      .then(() => setIsEditAvatarOpen(false))
      .catch(err => `Unable to save avatar: ${err}`)
  }

  // Define card preview functions
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsPreviewOpen(true)
  }

  // Define add place modal functions
  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true)
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setIsCardList([newCard, ...cardList])
        setIsAddPlaceOpen(false)
      })
      .catch(err => `Unable to add card: ${err}`)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setIsCardList((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => `Unable to update like status: ${err}`)
  }

  function handleCardDelete(card) {
    api.trashCard(card._id)
      .then(() => setIsCardList( cardList.filter(cards => cards._id !== card._id) ))
      .catch(err => `Unable to delete card: ${err}`)
  }

  // Define close modal function for all modals
  function closeAllPopups() {
    setIsEditAvatarOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlaceOpen(false)
    setIsConfirmTrashOpen(false)
    setIsPreviewOpen(false)
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
          cards={cardList}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlaceOpen} onClose={closeAllPopups} onUpdateCards={handleAddPlaceSubmit}/>
        <PopupWithForm isOpen={isConfirmTrashOpen} name='trash' title='Are you sure?' onClose={closeAllPopups} buttonText='Yes' />
      </CurrentUserContext.Provider>

      <ImagePopup isOpen={isPreviewOpen} onClose={closeAllPopups} card={selectedCard} />
    </div>
  )
}

export default App
