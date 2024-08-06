// функция обработки клика по кнопке закрытия и по оверлею
function handlePopupClick(evt, popup) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__button")
  ) {
    closeModal(popup);
    popup.removeEventListener("click", (e) => handlePopupClick(e, popup));
    popup.removeEventListener("click", (e) => handleProfileFormSubmit(e, popup));
  }
}

// функция обработки нажатия клавиши ESC
function handlePopupKey(evt, popup) {
  if (evt.key === "Escape") {
    closeModal(popup);
    popup.removeEventListener("keydown", (e) => handlePopupKey(e, popup));
  }
}

// функция открытия поп-апа
function openModal(item) {
  item.classList.toggle("popup_is-opened");
}

// функция закрытия поп-апа
function closeModal(item) {
  item.classList.remove("popup_is-opened");
}

// перебор попапов и слушатели событий клика и нажатия ESC
document.querySelectorAll(".popup").forEach((item) => {
  const clickHandler = (evt) => handlePopupClick(evt, item);
  const KeyHandler = (evt) => handlePopupKey(evt, item);
  item.addEventListener("click", clickHandler);
  document.addEventListener("keydown", KeyHandler);
});

export { openModal, closeModal };

