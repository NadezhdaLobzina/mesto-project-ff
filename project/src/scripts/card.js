// функция создания карточки
function createCard(
  cardData,
  userID,
  handleDeleteButtonClick,
  handleLikeButton,
  openImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikes = cardElement.querySelector(".likes-quantuty");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  const cardID = cardData._id;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleDeleteButtonClick(cardID, cardElement);
  });

  if (cardData.owner._id !== userID) {
    deleteButton.remove();
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    handleLikeButton(cardID, likeButton, cardLikes);
  });

  cardImage.addEventListener("click", openImage);

  return cardElement;
}

export { createCard };
