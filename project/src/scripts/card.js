// функция создания карточки
function createCard(cardData, removeCard, addLike, openImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", addLike);

  cardImage.addEventListener("click", openImage);

  return cardElement;
}

// функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".places__item").remove();
  evt.target.removeEventListener("click", removeCard);
}

//функция добавления/снятия лайка
function addLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, addLike };
