export class Card {

  constructor({
    data, 
    handleCardClick, 
    handleLikeClick, 
    handleDeleteIconClick, 
    userId
    }, 
    cardSelector
  ) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._cardId = data._id;
      this._ownerId = data.owner._id;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteClick = handleDeleteIconClick;
      this._userId = userId;
      this._cardSelector = cardSelector;
    }

  _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

      return cardElement;
  }

  isLiked() {
    return this._likes.some(item => item._id === this._userId);
  }

  toggleLikes(item) {
    this._likes = item;
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._element.querySelector(".element__button-like").classList.add("element__button-like_active");
    } else {
      this._element.querySelector(".element__button-like").classList.remove("element__button-like_active");
    }
  }

  generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector(".element__photo").alt = this._name;
      this._element.querySelector(".element__photo").src = this._link;
      this._element.querySelector(".element__title").textContent = this._name;

      this._deleteButton = this._element.querySelector(".element__delete");
      this._likeButton = this._element.querySelector(".element__button-like");
      this._likeCounter = this._element.querySelector(".element__like-counter");

      if (this._ownerId !== this._userId) {
        this._deleteButton.remove();
      }
      this.toggleLikes(this._likes);
      this._setEventListeners();
      return this._element;
  }

  _setEventListeners() {
    this._element.querySelector(".element__photo").addEventListener('click', () => {
        this._handleCardClick();
      });

      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteClick(this._id);
      });

      this._likeButton.addEventListener('click', () => {
        this._handleLikeClick(this._id);
      });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}