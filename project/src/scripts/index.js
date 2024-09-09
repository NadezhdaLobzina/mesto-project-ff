import "../pages/index.css";
import { createCard } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getProfileData,
  getCardsFromServer,
  patchProfile,
  postNewCard,
  deleteCard,
  addNewLike,
  removeLike,
  changeAvatar,
} from "./api";

// данные пользователя
const profileImage = document.querySelector(".profile__image");

// нахождение контейнера для карточек
const placesList = document.querySelector(".places__list");

// нахождение поп-апов
const popUps = document.querySelectorAll(".popup");
const editPopUP = document.querySelector(".popup_type_edit");
const newCardPopUP = document.querySelector(".popup_type_new-card");
const imagePopUP = document.querySelector(".popup_type_image");
const editAvatarPopup = document.querySelector(".popup_type_new-avatar");

// нахождение кнопок редактирования и добавления новой карточки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".avatar_button");

// элементы для реализации редактирования профиля
const editProfileForm = editPopUP.querySelector(".popup__form");
const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const jobInput = editProfileForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// элементы для реализации добавления новой карточки
const newCardForm = newCardPopUP.querySelector(".popup__form");
const newCardTitle = newCardForm.querySelector(".popup__input_type_card-name");
const newCardUrl = newCardForm.querySelector(".popup__input_type_url");

// элементы для реализации открытия картинки
const popUpImage = imagePopUP.querySelector(".popup__image");
const popUpTitle = imagePopUP.querySelector(".popup__caption");

// элементы для редактирования аватара
const editAvatarForm = editAvatarPopup.querySelector(".popup__form");
const editAvatarUrl = editAvatarForm.querySelector(".popup__input_type_url");

let profileID;

// объект свойств
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Загрузка данных профиля и карточек
Promise.all([getProfileData(), getCardsFromServer()])
  .then(([profileData, cardData]) => {
    profileImage.style.backgroundImage = `url('${profileData.avatar}')`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileID = profileData._id;

    cardData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        profileID,
        handleDeleteButtonClick,
        handleLikeButton,
        openImage
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.target.querySelector("button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  patchProfile(nameInput.value, jobInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(editPopUP);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// функция редактирования аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatar = editAvatarUrl.value;

  const submitButton = evt.target.querySelector("button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  changeAvatar(newAvatar)
    .then((result) => {
      profileImage.style.backgroundImage = url("${result.avatar}");
      closeModal(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// функция добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newTitle = newCardTitle.value;
  const newUrl = newCardUrl.value;

  const submitButton = evt.target.querySelector("button");
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Сохранение...";

  postNewCard(newTitle, newUrl)
    .then((result) => {
      const cardElement = createCard(
        result,
        profileID,
        handleDeleteButtonClick,
        handleLikeButton,
        openImage
      );
      placesList.prepend(cardElement);
      closeModal(newCardPopUP);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

// функция обработки нажатия лайка
const handleLikeButton = (cardId, button, likes) => {
  if (button.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((result) => {
        likes.textContent = result.likes.length;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addNewLike(cardId)
      .then((result) => {
        likes.textContent = result.likes.length;
        button.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// функция обработки клика по корзине
const handleDeleteButtonClick = (cardID, cardElement) => {
  deleteCard(cardID)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

// функция автоматического заполнения формы
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// функция открытия картинки
function openImage(evt) {
  popUpImage.src = evt.target.src;
  popUpTitle.textContent = evt.target.alt;
  popUpImage.alt = evt.target.alt;

  openModal(imagePopUP);
}

// функция обработки клика по кнопке редактирования аватара
function handleEditAvatarClick() {
  openModal(editAvatarPopup);
  clearValidation(editAvatarPopup, validationConfig);
}

// функция обработки клика по кнопке редактирования профиля
function handleEditButtonClick() {
  openModal(editPopUP);
  clearValidation(editPopUP, validationConfig);
  fillProfileForm();
}

// функция обработки клика по кнопке добавления новой карточки
function handleAddButtonClick() {
  openModal(newCardPopUP);
  clearValidation(newCardPopUP, validationConfig);
}

// функция проверки формы на ошибки
enableValidation(validationConfig);

// открытие поп-апов редактирования профиля и добавления новой карты по клику
editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);
editAvatarButton.addEventListener("click", handleEditAvatarClick);

// обработчик формы добавления новой карточки
newCardForm.addEventListener("submit", handleNewCardSubmit);

// обработчик формы сохранения данных профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// обработчик формы сохранения нового аватара
editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);
