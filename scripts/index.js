const placesList = document.querySelector(".places__list");

function addCard(cardData, removeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", removeCard);
  return cardElement;
}

function removeCard(evt) {
  const evtTarget = evt.target;
  const listItem = evtTarget.closest(".places__item");
  listItem.remove();
}

initialCards.forEach(function (cardData) {
  const cardElement = addCard(cardData, removeCard);
  placesList.append(cardElement);
});
