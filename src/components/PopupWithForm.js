function PopupWithForm (props) {
  return(
    <section className={`modal modal_type_${props.name} ${props.isOpen ? 'modal_display' : ''}`}>
        <div className="modal__body">
          <form className={`modal__form modal__form_type_${props.name}`} name={props.name}>
            <button
              type="button"
              className="modal__close-btn link"
              aria-label={`close ${props.name} menu`}
              onClick={props.onClose}
            ></button>
            <h2 className="modal__title">{props.title}</h2>
            {props.children}
          </form>
        </div>
      </section>
  )
} 

export default PopupWithForm;