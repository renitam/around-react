import React from 'react'
import Card from './Card'
import api from '../utils/api'
import { CurrentUserContext } from './CurrentUserContext'

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick }) {

  const [userName, setUserName] = React.useState('')
  const [userAbout, setUserAbout] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cardList, setCardList] = React.useState([])
  const userInfo = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setUserName(userInfo.name)
    setUserAbout(userInfo.about)
    setUserAvatar(userInfo.avatar)

    api.getInitialCards()
      .then( (initialCards) => {
        setCardList([...initialCards])
      })
      .catch(err => `Unable to load data: ${err}`)
    }, [userInfo])

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
          <Card key={item._id} card={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  )
}

export default Main