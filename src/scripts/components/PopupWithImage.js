import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector(".popup__img");
    this._titleImagePopup = document.querySelector(".popup__img-title");
  }

  open(data) {
    super.open();
    this._imagePopup.src = data.link;
    this._titleImagePopup.textContent = data.name;
    this._imagePopup.alt = data.name;
  }
}