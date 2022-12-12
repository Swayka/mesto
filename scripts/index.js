const cardsElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#element-template').content.querySelector('.element')

const picLink = document.querySelector('.popup__img');
const picTitle = document.querySelector('.popup__img-title');

const popupEdit = document.querySelector('.popup_type_profile');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupView = document.querySelector('.popup_type_picture');

const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupViewClose = popupView.querySelector('.popup__close');

const popupEditOpen = document.querySelector('.profile__edit-button');
const popupAddOpen = document.querySelector('.profile__add-button');
const popupViewOpen = document.querySelector('.element__photo');

const formAdd = document.forms["add-picture"];
const formTitle = formAdd.querySelector('.popup__input_type_title');
const formPicture = formAdd.querySelector('.popup__input_type_picture');
const formAddNewPicture = document.querySelector('.popup__form_picture');

const profileForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//удаляем картинку
const handleDeleteButtonClick = (e) => {
    e.target.closest('.element').remove()
}

//ставим лайк
const handleLikeButtonClick = (e) => {
    e.target.classList.toggle('element__button-like_active')
}


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

//Добавляем новые элементы из массива
function createElement(item) {

    const card = cardsTemplate.cloneNode(true);
    const cardTitle = card.querySelector('.element__title')
    const cardDeleteButton = card.querySelector('.element__delete')
    const cardLikeButton = card.querySelector('.element__button-like')
    const img = card.querySelector('.element__photo')

    cardTitle.textContent = item.name;
    img.src = item.link;
    img.alt = item.name;

    cardDeleteButton.addEventListener('click', handleDeleteButtonClick)
    cardLikeButton.addEventListener('click', handleLikeButtonClick)
    img.addEventListener('click', () => {
      openPopup(popupView);
      picLink.src = item.link;
      picLink.alt = item.name;
      picTitle.textContent = item.name;
    });
    return card;
}

cards.forEach(function(item) {
    const element = createElement(item)
    cardsElement.prepend(element)
})


//открытие и закрытие попапов

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByClickOnEsc)
    document.addEventListener('click', closePopupByClickOnOverlay)
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByClickOnEsc);
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

    const newCards = 
        {
          name: formTitle.value,
          link: formPicture.value
        }
    const element = createElement(newCards)
    cardsElement.prepend(element)
    closePopup(popupAdd);
    formAddNewPicture.reset();
  }

popupAdd.addEventListener('submit', handleFormAddPictureSubmit)
