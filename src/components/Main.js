import React from 'react'
import Card from './Card'
import api from '../utils/api'

function Main(props) {
  const [userName, setUserName] = React.useState('')
  const [userAbout, setUserAbout] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cardList, setCardList] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then( ([initialCards, { name, about, avatar}]) => {
      setUserName(name)
      setUserAbout(about)
      setUserAvatar(avatar)
      setCardList([...initialCards])
    })
    .catch(err => `Unable to load data: ${err}`)
  }, [])

  return(
    <main>
      <section className='profile'>
        <div className='profile__content'>
          <div className='profile__avatar-overlay'>
            <img
              src={userAvatar}
              alt='Profile avatar'
              className='profile__avatar'
              onClick={props.onEditAvatarClick}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{userName}</h1>
            <button
              type='button'
              className='profile__edit-btn link'
              aria-label='open edit profile menu'
              onClick={props.onEditProfileClick}
            ></button>
            <p className='profile__about'>{userAbout}</p>
          </div>
        </div>
        <button type='button' className='profile__add-btn link' onClick={props.onAddPlaceClick}></button>
      </section>

      <section className='cards'>
        {cardList.map((item) => (
          <Card key={item._id} card={item} onCardClick={props.onCardClick}/>
        ))}
      </section>
    </main>
  )
}

export default Main