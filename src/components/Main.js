import React from 'react';
import api from '../utils/api';

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userAbout, setUserAbout] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const cardContainer = document.querySelector(".cards");

  const renderCard = (item) => {
    cardContainer.prepend(item)
  }

  console.log(api)

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
    .then( ([initialCards, userInfo]) => {
      console.log(initialCards, userInfo);
      setUserName(userInfo.name);
      setUserAbout(userInfo.about);
      setUserAvatar(userInfo.avatar);
      setCards(initialCards.reverse());
      cards.forEach((item) => {
        console.log(item)
        // renderCard(
        //   <article className="card">
        //   <button
        //     type="button"
        //     className="card__trash link"
        //     aria-label="trash button"
        //   ></button>
        //   <img src="${}" alt="" className="card__image" />
        //   <div className="card__info-wrapper">
        //     <h2 className="card__title">Card</h2>
        //     <div className="card__like-wrapper">
        //       <button
        //         type="button"
        //         className="card__like"
        //         aria-label="like button"
        //       ></button>
        //       <p className="card__like-num">0</p>
        //     </div>
        //   </div>
        // </article>
        // )
      });
    })
    .catch(err => `Unable to load data: ${err}`)
  }, [])

  return(
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-overlay">
            <img
              src={userAvatar}
              alt="Profile avatar"
              className="profile__avatar"
              onClick={props.onEditAvatarClick}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              type="button"
              className="profile__edit-btn link"
              aria-label="open edit profile menu"
              onClick={props.onEditProfileClick}
            ></button>
            <p className="profile__about">{userAbout}</p>
          </div>
        </div>
        <button type="button" className="profile__add-btn link" onClick={props.onAddPlaceClick}></button>
      </section>

      <section className="cards"></section>
    </main>
  );
}

export default Main;