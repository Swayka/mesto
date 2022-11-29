const сards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


const сardsElement = document.querySelector('.elements');
const cardsTemplate = document.querySelector('#element-template').content.querySelector('.element')

const picLink = document.querySelector('.popup__img');
const picTitle = document.querySelector('.popup__img-title');

const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const popupView = document.querySelector('.popup-view');

const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupViewClose = popupView.querySelector('.popup__close');

const popupEditOpen = document.querySelector('.profile__edit-button');
const popupAddOpen = document.querySelector('.profile__add-button');
const popupViewOpen = document.querySelector('.element__photo');

const formAdd = document.querySelector('.popup-add');
const formTitle = formAdd.querySelector('.popup__input_type_title');
const formPicture = formAdd.querySelector('.popup__input_type_picture');

const formElement = document.querySelector('.popup__profile');
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

//открываем просмотр картинки
const openPopupView = (e) => {
  picLink.src = e.target.src;
  picLink.alt = e.target.alt;
  picTitle.textContent = e.target.alt;
  togglePopup(popupView);
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
    img.addEventListener('click', openPopupView)

    return card;
}

сards.forEach(function(item) {
    const element = createElement(item)
    сardsElement.prepend(element)
})


//открытие и закрытие попапов
const togglePopup = function (popup) {
    popup.classList.toggle('popup_opened');
}

popupEditOpen.addEventListener('click', function() {
    togglePopup(popupEdit)
})
popupAddOpen.addEventListener('click', function() {
    togglePopup(popupAdd);
})


popupEditClose.addEventListener('click', function() {
    togglePopup(popupEdit);
})
popupAddClose.addEventListener('click', function() {
    togglePopup(popupAdd);
})
popupViewClose.addEventListener('click', function() {
    togglePopup(popupView);
})


//обработчик собтый Edit
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    togglePopup(popupEdit)
}

formElement.addEventListener('submit', formSubmitHandler);

//добавляем новую карточку
const handleFormAddPictureSubmit = (evt) => {
    evt.preventDefault()

    const newCards = 
        {
          name: formTitle.value,
          link: formPicture.value
        }
        const element = createElement(newCards)
        сardsElement.prepend(element)
    togglePopup(popupAdd);

}

formAdd.addEventListener('submit', handleFormAddPictureSubmit )
