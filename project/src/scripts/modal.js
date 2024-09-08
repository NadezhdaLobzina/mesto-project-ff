// функция обработки клика по кнопке закрытия, сохранения и по оверлею
function handlePopupClick(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closeModal(activePopup);
    }
  }
}

// // функция обработки нажатия клавиши ESC
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    if (activePopup) {
      closeModal(activePopup);
    }
  }
}

// функция открытия поп-апа
function openModal(item) {
  item.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
  item.addEventListener("click", handlePopupClick);
}

// функция закрытия поп-апа
function closeModal(item) {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
  item.removeEventListener("click", handlePopupClick);
}

export { openModal, closeModal };
