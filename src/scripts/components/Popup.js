export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");
    this._submitButton = this._popup.querySelector(".popup__submit")
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener(`click`, (e) => {
      if (
        e.target.classList.contains("popup_opened") ||
        e.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}