import profilePic from '../images/profile-pic.jpg';

function Main() {
  return(
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-overlay">
            <img
              src={profilePic}
              alt="Profile avatar"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">Jacque Cousteau</h1>
            <button
              type="button"
              className="profile__edit-btn link"
              aria-label="open edit profile menu"
            ></button>
            <p className="profile__about">Explorer</p>
          </div>
        </div>
        <button type="button" className="profile__add-btn link"></button>
      </section>

      <section className="cards"></section>

      <section className="modal modal_type_profile">
        <div className="modal__body">
          <form className="modal__form modal__form_type_profile" name="profile">
            <button
              type="button"
              className="modal__close-btn link"
              aria-label="close edit profile menu"
            ></button>
            <h2 className="modal__title">Edit profile</h2>
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
            <button type="submit" className="modal__save" id="profile">Save</button>
          </form>
        </div>
      </section>

      <section className="modal modal_type_card">
        <div className="modal__body">
          <form className="modal__form modal__form_type_card" name="place">
            <button
              type="button"
              className="modal__close-btn link"
              aria-label="close add place menu"
            ></button>
            <h2 className="modal__title">New place</h2>
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
            <button type="submit" className="modal__save">Create</button>
          </form>
        </div>
      </section>

      <section className="modal modal_type_avatar">
        <div className="modal__body">
          <form className="modal__form modal__form_type_avatar" name="avatar">
            <button
              type="button"
              className="modal__close-btn link"
              aria-label="close profile pic menu"
            ></button>
            <h2 className="modal__title">Change profile picture</h2>
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
            <button type="submit" className="modal__save">Save</button>
          </form>
        </div>
      </section>

      <section className="modal modal_type_trash">
        <div className="modal__body">
          <form className="modal__form modal__form_type_trash" name="delete">
            <button
              type="button"
              className="modal__close-btn link"
              aria-label="close delete card menu"
            ></button>
            <h2 className="modal__title">Are you sure?</h2>
            <button type="submit" className="modal__save">Yes</button>
          </form>
        </div>
      </section>

      <section className="modal modal_type_preview">
        <div className="modal__body modal__body_type_preview">
          <button
            type="button"
            className="modal__close-btn modal__close-btn_type_preview link"
            aria-label="close image preview"
          ></button>
          <img src="#" alt="n/a" className="modal__image" />
          <p className="modal__caption"></p>
        </div>
      </section>

      <template id="card">
        <article className="card">
          <button
            type="button"
            className="card__trash link"
            aria-label="trash button"
          ></button>
          <img src="#" alt="" className="card__image" />
          <div className="card__info-wrapper">
            <h2 className="card__title">Card</h2>
            <div className="card__like-wrapper">
              <button
                type="button"
                className="card__like"
                aria-label="like button"
              ></button>
              <p className="card__like-num">0</p>
            </div>
          </div>
        </article>
      </template>
    </main>
  );
}

export default Main;