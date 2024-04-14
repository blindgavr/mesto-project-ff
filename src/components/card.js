import {
  openModal,
  } from "./modal.js";

  const imageCardPopup = document.querySelector(".popup_type_image");
  const cardImage = imageCardPopup.querySelector(".popup__image");
  const popupCaption = imageCardPopup.querySelector(".popup__caption");

  export function createCard(element, deleteCard, likeCard, openModalImage) {
    const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
    card.querySelector(".card__image").src = element.link;
    card.querySelector(".card__image").alt = element.alt;
    card.querySelector(".card__title").textContent = element.name;
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", () => deleteCard(card));
    const likeButton = card.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => likeCard(likeButton));
    const editImage = card.querySelector(".card__image");
    editImage.addEventListener("click", () => openModalImage(card));
    return card;
  }
  
 export const deleteCard = (card) => card.remove();

 export const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
 }

 export const openModalImage = (card) => {
  openModal(imageCardPopup);
  cardImage.src = card.querySelector(".card__image").src;
  cardImage.alt = card.querySelector(".card__image").alt;
  popupCaption.textContent = card.querySelector(".card__title").textContent;
}