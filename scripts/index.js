import {Card} from './card.js'
import {cards, settingsValidation} from './data.js'
import {FormValidator} from './formValidator.js'

const cardsElement = document.querySelector('.elements');
//const cardsTemplate = document.querySelector('#element-template').content.querySelector('.element')

const picLink = document.querySelector('.popup__img');
const picTitle = document.querySelector('.popup__img-title');

const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupView = document.querySelector('.popup_type_picture');

//const popupEditClose = popupEdit.querySelector('.popup__close');
//const popupAddClose = popupAdd.querySelector('.popup__close');
//const popupViewClose = popupView.querySelector('.popup__close');

const popupEditOpen = document.querySelector('.profile__edit-button');
const popupAddOpen = document.querySelector('.profile__add-button');
//const popupViewOpen = document.querySelector('.element__photo');

const formAdd = document.forms["add-picture"];
const formTitle = formAdd.querySelector('.popup__input_type_title');
const formPicture = formAdd.querySelector('.popup__input_type_picture');
const formAddNewPicture = document.querySelector('.popup__form_picture');

const profileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');


//закрытие попапа по overlay и esc
const closePopupByClickOnEsc = function(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}
const closePopupByClickOnOverlay = function(e) {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(e.target)
  }
}

//создаем карточку
const createCards = (name, link) => {
  const card = new Card (name, link);
  const cardElement = card.generateCard();
  return cardElement;
}

//публикуем карточки из масива
cards.forEach ((item) => {
  const cardElement = createCards(item.name, item.link);
  cardsElement.prepend(cardElement);
});

//открытие и закрытие попапов
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByClickOnEsc);
    document.addEventListener('click', closePopupByClickOnOverlay);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByClickOnEsc);
  document.removeEventListener('click', closePopupByClickOnOverlay);
}

popupEditOpen.addEventListener('click', function() {
  openPopup(popupEdit)
})
popupAddOpen.addEventListener('click', function() {
  openPopup(popupAdd);
})

//обработчик крестиков
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//обработчик собтый Edit
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit)
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

//добавляем новую карточку
const handleFormAddPictureSubmit = (evt) => {
    evt.preventDefault()

    const newCard = createCards(formTitle.value, formPicture.value);
    cardsElement.prepend(newCard);
    closePopup(popupAdd);
    formAddNewPicture.reset();
  }

popupAdd.addEventListener('submit', handleFormAddPictureSubmit)

//прверяем валидацию формы профиля
const profileFormValidation = new FormValidator(settingsValidation, profileForm);
profileFormValidation.enableValidation();

//проверяем валидацию формы создания новой карточки
const cardFormValidation = new FormValidator(settingsValidation, formAddNewPicture);
cardFormValidation.enableValidation();

export {openPopup, popupView, picLink, picTitle};