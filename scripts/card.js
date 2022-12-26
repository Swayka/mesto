import {openPopup, popupView, picLink, picTitle} from './index.js'

export class Card {
  constructor (name, link) {
    this._name = name;
    this._link = link;
  }
  _getTemplate() {
    const cardElement = document
    .querySelector('.element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;

    return this._element;
  }

  _handleLikeButtonClick () {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }
  _handleDeleteButtonClick () {
    this._element.closest('.element').remove();
  }
  
  _setEventListeners () {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () =>{
      this._handleDeleteButtonClick();
    })

    this._element.querySelector('.element__photo').addEventListener('click', () => {
      openPopup(popupView);
      picTitle.textContent = this._name;
      picLink.src = this._link;
      picLink.alt = this._link;
    })
  }
}

