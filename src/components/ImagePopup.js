function ImagePopup() {
  return(
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
  )
}

export default ImagePopup;