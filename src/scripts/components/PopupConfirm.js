import {Popup} from "./Popup.js";

export class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".popup__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleDeleteCard();
    })
  }

  open(handleDeleteCard) {
    super.open()
    this._handleDeleteCard = handleDeleteCard;
  }
}