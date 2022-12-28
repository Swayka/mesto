import {Card} from './Card.js'
import {cards, settingsValidation} from './data.js'
import {FormValidator} from './FormValidator.js'

const cardsElement = document.querySelector('.elements');

const picLink = document.querySelector('.popup__img');
const picTitle = document.querySelector('.popup__img-title');

const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupView = document.querySelector('.popup_type_picture');

const popupEditOpen = document.querySelector('.profile__edit-button');
const popupAddOpen = document.querySelector('.profile__add-button');

const formAdd = document.forms["add-picture"];
const formTitle = formAdd.querySelector('.popup__input_type_title');
const formPicture = formAdd.querySelector('.popup__input_type_picture');
const formAddNewPicture = document.querySelector('.popup__form_picture');

const profileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const closeButtons = document.querySelectorAll('.popup__close');


//функция закрытия попапа при нажатии esc
const closePopupByClickOnEsc = function(e) {
  if (e.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//функция закрытия попапа по клику на overlay
const closePopupByClickOnOverlay = function(e) {
  if(e.target === e.currentTarget) {
    closePopup(e.target);
  }
}

//функция создания карточки
const createCards = (name, link) => {
  const card = new Card (name, link, '.element-template');
  const cardElement = card.generateCard();
  return cardElement;
}

//публикуем карточки из масива
cards.forEach ((item) => {
  const cardElement = createCards(item.name, item.link);
  cardsElement.prepend(cardElement);
});

//функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

//функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByClickOnEsc);
}

//слушатель нажатия на кнопку редактирования профиля
popupEditOpen.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  profileFormValidation.resetValidation();
  profileFormValidation.toggleButtonState ();
})

//слушатель нажатия на кнопку добавления карточки
popupAddOpen.addEventListener('click', function() {
  openPopup(popupAdd);
  formAddNewPicture.reset();
  cardFormValidation.resetValidation();
  cardFormValidation.toggleButtonState ();
})

// функция закрытия поапов при нажатии крестиков
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//функция редактирования профиля
function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);
}

//функция добавления новой карточки
const handleFormAddPictureSubmit = (evt) => {
  evt.preventDefault()
  const newCard = createCards(formTitle.value, formPicture.value);
  cardsElement.prepend(newCard);
  closePopup(popupAdd);
}

//слушатели нажатия на кнопки submit
popupAdd.addEventListener('submit', handleFormAddPictureSubmit)
profileForm.addEventListener('submit', handleProfileFormSubmit);

//слушатели кликов по оверлей
popupEdit.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupView.addEventListener('click', closePopupByClickOnOverlay);

//прверяем валидацию формы профиля
const profileFormValidation = new FormValidator(settingsValidation, profileForm);
profileFormValidation.enableValidation();

//проверяем валидацию формы создания новой карточки
const cardFormValidation = new FormValidator(settingsValidation, formAddNewPicture);
cardFormValidation.enableValidation();

export {openPopup, popupView, picLink, picTitle};