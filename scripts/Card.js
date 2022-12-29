import {openPopup, popupView, picLink, picTitle} from './index.js'

export class Card {
  constructor (name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
    this._cardImage = this._element.querySelector('.element__photo');
    this._likeButton = this._element.querySelector('.element__button-like');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _handleLikeButtonClick () {
    this._likeButton.classList.toggle('element__button-like_active');
  }
  _handleDeleteButtonClick () {
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners () {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () =>{
      this._handleDeleteButtonClick();
    })

    this._cardImage.addEventListener('click', () => {
      openPopup(popupView);
      picTitle.textContent = this._name;
      picLink.src = this._link;
      picLink.alt = this._link;
    })
  }
}

