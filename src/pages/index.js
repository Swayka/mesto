import './index.css';
import {Card} from "../scripts/components/Card.js";
import {PopupWithForm} from "../scripts/components/PopupWithForm.js";
import {PopupWithImage} from "../scripts/components/PopupWithImage.js";
import {Section} from "../scripts/components/Section.js";
import {UserInfo} from "../scripts/components/UserInfo.js";
import {FormValidator} from "../scripts/components/FormValidator.js";
import {PopupConfirm} from "../scripts/components/PopupConfirm";
import {
  settingsValidation,
  cardsElement,
  popupEditButton,
  popupAddButton,
  formAddNewPicture,
  profileForm,
  nameInput,
  jobInput,
  profileAvatarButton,
  profileAvatar,
  confirmForm
} from "../scripts/utils/components.js";
import {Api} from "../scripts/components/Api.js"


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "0cbf3665-4ef0-425a-8420-0f1dd1290047",
    "Content-Type": "application/json",
  },
});

let userId;
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, userCard]) => {
    profileInfo.setUserInfo(userData);
    userId = userData._id;
    profileAvatar.src = userData.avatar;
    cardSection.renderItems(userCard);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const createCards = (data) => {
  const newCard = new Card ({
    data: data,
    userId: userId,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleLikeClick: () => {
      if(newCard.isLiked()) {
        api
          .removeLike(data._id)
          .then((data) => {
            newCard.toggleLikes(data.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(data._id)
          .then((data) => {
            newCard.toggleLikes(data.likes);
          })
          .catch((err) => console.log(err));
      }
    },
    handleDeleteIconClick: () => {
      popupConfirmation.open(() => {
        api
        .removeCard(data._id)
        .then(() => {
          newCard.removeCard();
          popupConfirmation.close();
        })
        .catch((err) => console.log(err))
      })
    }
  },
    ".element-template"
  );
  const cardElement = newCard.generateCard()
  return cardElement;
}

const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCards(item));
    },
  }, cardsElement
);

const profileInfo = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__description",
  profileAvatarSelector: ".profile__foto",
});

//попап подтверждения
const popupConfirmation = new PopupConfirm(".popup_type_confirm");
popupConfirmation.setEventListeners();

//попап картинки
const popupWithImage = new PopupWithImage(".popup_type_picture");
popupWithImage.setEventListeners();

//редактировать профиль
const popupWithEdithForm = new PopupWithForm(".popup_type_profile", (data) => {
  popupWithEdithForm.renderLoading(true);
  api
    .editUserInfo(data)
    .then((data) => {
        profileInfo.setUserInfo(data);
        popupWithEdithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithEdithForm.renderLoading(false);
    });
  });
;
popupWithEdithForm.setEventListeners();

//добавить карточку
const popupWithAddForm = new PopupWithForm ('.popup_type_card-add', (data) => {
  popupWithAddForm.renderLoading(true);
  api
    .newCard({ name: data["pictureName"], link: data["picture-link"] })
    .then((data) => {
      cardSection.addItem(createCards(data));
      popupWithAddForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAddForm.renderLoading(false);
    });
});
popupWithAddForm.setEventListeners();

//поменять аватарку
const popupAvatarEdit = new PopupWithForm (".popup_type_editFoto", (userData) => {
  popupAvatarEdit.renderLoading(true);
  api
    .editAvatar(userData)
    .then((data) => {
      profileInfo.setUserInfo(data);
      popupAvatarEdit.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatarEdit.renderLoading(false);
    })
});
popupAvatarEdit.setEventListeners();


//прверяем валидацию форм
const profileFormValidation = new FormValidator(settingsValidation, profileForm);
profileFormValidation.enableValidation();
const cardFormValidation = new FormValidator(settingsValidation, formAddNewPicture);
cardFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(settingsValidation, confirmForm);
avatarFormValidation.enableValidation();

//слушатели
popupAddButton.addEventListener('click', () => {
  popupWithAddForm.open();
  cardFormValidation.resetValidation();
  cardFormValidation.toggleButtonState();
});

popupEditButton.addEventListener('click', () => {
  popupWithEdithForm.open();
  const userInfo = profileInfo.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  profileFormValidation.resetValidation();
  profileFormValidation.toggleButtonState();
});

profileAvatarButton.addEventListener("click", () => {
  popupAvatarEdit.open();
  avatarFormValidation.resetValidation();
  avatarFormValidation.toggleButtonState();
})