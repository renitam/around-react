import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "./CurrentUserContext"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = React.useContext(CurrentUserContext) || ''
  const avatarUrl = React.createRef(currentUser.avatar)

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    })
    avatarUrl.current.value = ''
  }

  return (
    <PopupWithForm isOpen={isOpen} name='avatar' title='Change profile picture' onClose={onClose} onSubmit={handleSubmit}>
      <input
        type='url'
        name='link'
        id='avatar'
        ref={avatarUrl}
        className='modal__input'
        placeholder='Image link'
        minLength='1'
        required
      />
      <span className='modal__input-error modal__input-error_avatar'></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup