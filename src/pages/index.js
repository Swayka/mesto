import './index.css';
import {Card} from "../scripts/components/Card.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {Section} from "../scripts/components/Section.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {cards} from "../scripts/utils/data.js";
import {
  settingsValidation,
  cardsElement,
  popupEditButton,
  popupAddButton,
  formAddNewPicture,
  profileForm,
  nameInput,
  jobInput,
} from "../scripts/utils/components.js";

//прверяем валидацию формы профиля
const profileFormValidation = new FormValidator(settingsValidation, profileForm);
profileFormValidation.enableValidation();

//проверяем валидацию формы создания новой карточки
const cardFormValidation = new FormValidator(settingsValidation, formAddNewPicture);
cardFormValidation.enableValidation();


const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const createCards = (data) => {
  const card = new Card (data, '.element-template', () => {
    popupWithImage.open(data);
  });
  const cardElement = card.generateCard();
  return cardElement;
}


const cardSection = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = createCards(item);
      cardSection.addItem(card);
    },
  }, cardsElement
);
cardSection.renderItems();



const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description'
});



const popupWithEdithForm = new PopupWithForm('.popup_type_profile', ({name, info}) => {
  userInfo.setUserInfo({name: nameInput.value, info: jobInput.value});
});
popupWithEdithForm.setEventListeners();


const popupWithAddForm = new PopupWithForm ('.popup_type_card-add', (data) => {
  const newCard = createCards({ name: data["pictureName"], link: data["picture-link"] });
  cardSection.addItem(newCard);
})
popupWithAddForm.setEventListeners();



popupEditButton.addEventListener('click', () => {
  popupWithEdithForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().info;
  profileFormValidation.resetValidation();
  profileFormValidation.toggleButtonState();
});

popupAddButton.addEventListener('click', () => {
  popupWithAddForm.open();
  cardFormValidation.resetValidation();
  cardFormValidation.toggleButtonState();
});