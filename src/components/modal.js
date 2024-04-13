export function keyHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", keyHandler);
  return popup;
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", keyHandler);
}

export function closeModalOverlay(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.target.classList.contains("popup")) {
    closeModal(openedPopup);
  }
}
