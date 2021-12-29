function ImagePopup(props) {
  return(
    <section className={`modal modal_type_preview ${props.isOpen ? 'modal_display' : ''}`}>
      <div className="modal__body modal__body_type_preview">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_preview link"
          aria-label="close image preview"
          onClick={props.onClose}
        ></button>
        <img src={props.card.link} alt={props.card.name} className="modal__image" />
        <p className="modal__caption">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;