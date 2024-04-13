import {
    openModalImage,
  } from "../index.js";

  export function createCard(element, deleteCard) {
    const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
    card.querySelector(".card__image").src = element.link;
    card.querySelector(".card__image").alt = element.alt;
    card.querySelector(".card__title").textContent = element.name;
    const likeButton = card.querySelector(".card__like-button");
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.addEventListener("click", () => deleteCard(card));
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });
    const editImage = card.querySelector(".card__image");
    editImage.addEventListener("click", () => {
      openModalImage(card);
    });
    return card;
  }
  
 export const deleteCard = (card) => card.remove();