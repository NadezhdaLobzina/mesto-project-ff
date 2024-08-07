import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard, removeCard, addLike } from "./card";
import { openModal, closeModal } from "./modal";

// нахождение контейнера для карточек
const placesList = document.querySelector(".places__list");

// нахождение поп-апов
const popUps = document.querySelectorAll(".popup");
const editPopUP = document.querySelector(".popup_type_edit");
const newCardPopUP = document.querySelector(".popup_type_new-card");
const imagePopUP = document.querySelector(".popup_type_image");

// нахождение кнопок редактирования и добавления новой карточки
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

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

// функция открытия картинки
function openImage(evt) {
  popUpImage.src = evt.target.src;
  popUpTitle.textContent = evt.target.alt;
  popUpImage.alt = evt.target.alt;

  openModal(imagePopUP);
}

// функция автоматического заполнения формы
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// функция редактирования данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  evt.target.removeEventListener("click", handleProfileFormSubmit);
}

// функция добавления новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const newTitle = newCardTitle.value;
  const newUrl = newCardUrl.value;

  const cardElement = createCard(
    { name: newTitle, link: newUrl },
    removeCard,
    addLike,
    openModal
  );
  placesList.prepend(cardElement);

  closeModal(newCardPopUP);
  newCardForm.reset();
}

// функция обработки клика по кнопке редактирования профиля
function handleEditButtonClick() {
  openModal(editPopUP);
  fillProfileForm();
}

// функция обработки клика по кнопке добавления новой карточки
function handleAddButtonClick() {
  openModal(newCardPopUP);
}

// вставка карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, removeCard, addLike, openImage);
  placesList.append(cardElement);
});

// открытие поп-апов редактирования профиля и добавления новой карты по клику
editButton.addEventListener("click", handleEditButtonClick);
addButton.addEventListener("click", handleAddButtonClick);

// обработчик формы добавления новой карточки
newCardForm.addEventListener("submit", handleNewCardSubmit);

// обработчик формы сохранения данных профиля
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
