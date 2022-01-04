import PopupWithForm from "./PopupWithForm"
import React from "react"

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const placeTitle = React.createRef()
  const placeLink = React.createRef()

  function handleAddCard(e) {
    e.preventDefault()
    console.log(placeTitle.current.value, placeLink.current.value)
    onUpdateCards({ 
      name: placeTitle.current.value, 
      link: placeLink.current.value 
    })
    placeTitle.current.value = ''
    placeLink.current.value = ''
  }

  return(
    <PopupWithForm isOpen={isOpen} name='card' title='New place' onClose={onClose} buttonText='Create' onSubmit={handleAddCard}>
      <input
        type='text'
        name='name'
        id='place'
        ref={placeTitle}
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
        ref={placeLink}
        className='modal__input'
        placeholder='Image link'
        required
      />
      <span className='modal__input-error modal__input-error_image'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup