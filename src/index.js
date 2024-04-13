import "./styles/index.css"; // добавьте импорт главного файла стилей
import {
  initialCards
} from "./scripts/cards.js";
import {
  deleteCard,
  createCard
} from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalOverlay,
} from "./components/modal.js";

const popups = document.querySelectorAll(".popup");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addNewCard = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup_type_edit");
const closeButtons = document.querySelectorAll(".popup__close");

initialCards.forEach((arrayItem) => {
  const placesList = document.querySelector(".places__list");
  placesList.append(createCard(arrayItem, deleteCard));
});

addNewCard.addEventListener("click", () => {
  openModal(newCardPopup);
});

editProfileButton.addEventListener("click", () => {
  openModalProfile(editProfile);
});

closeButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  });
});

popups.forEach((item) => {
  item.addEventListener("click", closeModalOverlay);
});

const formElementProfile = document.getElementsByName("edit-profile")[0];
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_description");

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  document.querySelector(".profile__title").textContent = nameInputValue;
  document.querySelector(".profile__description").textContent = jobInputValue;
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
}

formElementProfile.addEventListener("submit", handleFormSubmitProfile);

const formElementNewCard = document.getElementsByName("new-place")[0];
const placeInput = formElementNewCard.querySelector(".popup__input_type_card-name");
const linkInput = formElementNewCard.querySelector(".popup__input_type_url");

function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const placeInputValue = placeInput.value;
  const linkInputValue = linkInput.value;
  initialCards.unshift({
    name: placeInputValue,
    link: linkInputValue,
    alt: placeInputValue,
  });
  const placesList = document.querySelector(".places__list");
  placesList.prepend(createCard(initialCards[0], deleteCard));
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
  placeInput.value = "";
  linkInput.value = "";
}

formElementNewCard.addEventListener("submit", handleFormSubmitPlace);

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

function openModalProfile(popup){
  const title = document.querySelector(".profile__title").textContent;
  const description = document.querySelector(".profile__description").textContent;
  document.getElementsByName("name")[0].value = title;
  document.getElementsByName("description")[0].value = description;
  openModal(popup)
}

export function openModalImage(card) {
  const imageCardPopup = document.querySelector(".popup_type_image");
  openModal(imageCardPopup);
  const cardImage = imageCardPopup.querySelector(".popup__image");
  cardImage.src = card.querySelector(".card__image").src;
  cardImage.alt = card.querySelector(".card__image").alt;
  const popup__caption = imageCardPopup.querySelector(".popup__caption");
  popup__caption.textContent = card.querySelector(".card__title").textContent;
}
