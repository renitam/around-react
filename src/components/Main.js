import React from 'react'
import Card from './Card'
import api from '../utils/api'
import { CurrentUserContext } from './CurrentUserContext'

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick }) {

  const [userName, setUserName] = React.useState('')
  const [userAbout, setUserAbout] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cardList, setCardList] = React.useState([])
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setUserName(currentUser.name)
    setUserAbout(currentUser.about)
    setUserAvatar(currentUser.avatar)

    api.getInitialCards()
      .then( (initialCards) => {
        setCardList([...initialCards])
      })
      .catch(err => `Unable to load data: ${err}`)
    }, [currentUser, cardList])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCardList((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
    api.trashCard(card._id)
      .then( setCardList( cardList.filter(cards => cards._id !== card._id) ))
      .catch(err => `Unable to delete card: ${err}`)
  }

  return(
    <main>
      <section className='profile'>
        <div className='profile__content'>
          <div className='profile__avatar-overlay'>
            <img
              src={userAvatar}
              alt='Profile avatar'
              className='profile__avatar'
              onClick={onEditAvatarClick}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              type='button'
              className='profile__edit-btn link'
              aria-label='open edit profile menu'
              onClick={onEditProfileClick}
            ></button>
            <p className='profile__about'>{userAbout}</p>
          </div>
        </div>
        <button type='button' className='profile__add-btn link' onClick={onAddPlaceClick}></button>
      </section>

      <section className='cards'>
        {cardList.map((item) => (
          <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main