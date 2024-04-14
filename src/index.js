import "./styles/index.css"; // добавьте импорт главного файла стилей
import {
  initialCards
} from "./scripts/cards.js";
import {
  deleteCard,
  createCard,
  likeCard,
  openModalImage
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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const name = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");

initialCards.forEach((arrayItem) => {
  const placesList = document.querySelector(".places__list");
  placesList.append(createCard(arrayItem, deleteCard, likeCard, openModalImage));
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
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
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
  const newCard = {
    name: placeInputValue,
    link: linkInputValue,
    alt: placeInputValue,
  }
  placesList.prepend(createCard(newCard, deleteCard, likeCard, openModalImage));
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
  evt.target.reset();
}

formElementNewCard.addEventListener("submit", handleFormSubmitPlace);

popups.forEach((item) => {
  item.classList.add("popup_is-animated");
});

function openModalProfile(popup){
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  openModal(popup)
}
