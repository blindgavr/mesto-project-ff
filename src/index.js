import "./styles/index.css"; // добавьте импорт главного файла стилей
//import {
//  initialCards
//} from "./scripts/cards.js";
import {
  deleteCard,
  createCard,
  likeCard,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  closeModalOverlay,
} from "./components/modal.js";
import {
  validationSettings,
  enableValidation,
  clearValidation,
} from "./components/validation.js";
import {
  getInitialCards,
  getUserData,
  patchUserData,
  postCard,
  changeAvatar
} from "./components/api.js";

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
const imageCardPopup = document.querySelector(".popup_type_image");
const cardImage = imageCardPopup.querySelector(".popup__image");
const popupCaption = imageCardPopup.querySelector(".popup__caption");
const profileAvatar = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type-avatar");

const openModalImage = (card) => {
  openModal(imageCardPopup);
  cardImage.src = card.querySelector(".card__image").src;
  cardImage.alt = card.querySelector(".card__image").alt;
  popupCaption.textContent = card.querySelector(".card__title").textContent;
}

/*initialCards.forEach((arrayItem) => {
  const placesList = document.querySelector(".places__list");
  placesList.append(createCard(arrayItem, deleteCard, likeCard, openModalImage));
});*/

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    const userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((arrayItem) => {
      const cardItem = createCard(arrayItem, deleteCard, likeCard, openModalImage, userId);
      placesList.append(cardItem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

addNewCard.addEventListener("click", () => {
  openModal(newCardPopup);
});

profileAvatar.addEventListener("click", () => {
  openModal(avatarPopup);
});

editProfileButton.addEventListener("click", () => {
  openModalProfile(editProfile);
  clearValidation(editProfile, validationSettings);
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
//const nameInput = formElementProfile.querySelector(".popup__input_type_name");
//const jobInput = formElementProfile.querySelector(".popup__input_type_description");

/*function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
}*/

//formElementProfile.addEventListener("submit", handleFormSubmitProfile);

const formElementNewCard = document.getElementsByName("new-place")[0];
const placeInput = formElementNewCard.querySelector(".popup__input_type_card-name");
const linkInput = formElementNewCard.querySelector(".popup__input_type_url");

/*function handleFormSubmitPlace(evt) {
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
  clearValidation(openedPopup, validationSettings);
  closeModal(openedPopup);
  evt.target.reset();
}*/

function handleFormSubmitPlace(evt) {
  renderLoading(evt.submitter, "Сохранение...");
  evt.preventDefault();
  const placeInputValue = placeInput.value;
  const linkInputValue = linkInput.value;
  const newCard = {
    name: placeInputValue,
    link: linkInputValue,
    alt: placeInputValue,
  }
  postCard(newCard.name, newCard.link)
  .then((res) => {
    const userId = res.owner._id;
    const cardItem = createCard(res, deleteCard, likeCard, openModalImage, userId);
    placesList.prepend(cardItem);
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
    evt.target.reset();
    clearValidation(openedPopup, validationSettings);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, "Сохранить"));
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

enableValidation(validationSettings);

function handleEditProfile() {
  function handleProfileFormSubmit(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    const userData = {
      titleName: name.value,
      about: description.value
    }
    //console.log(userData);
    patchUserData(userData.titleName, userData.about)
      .then( (res) => {
        profileTitle.textContent = res.name;
        profileDescription.textContent = res.about;
        closeModal(editProfile);
      })
      .catch((err) => {
        console.log(err + "ДА ЧТО Ж ТАКОЕ ТО");
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  const profileFormElement = editProfile.querySelector(".popup__form");
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
  
}

handleEditProfile();

function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  let userAvatar = "";
  function handleFormSubmitAvatar(evt) {
    renderLoading(evt.submitter, "Сохранение...");
    evt.preventDefault();
    changeAvatar({ avatar: avatarInput.value })
      .then((data) => {
        profileAvatar.style = `background-image: url(${data.avatar})`;
        userAvatar = data.avatar;
        closeModal(avatarPopup);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => renderLoading(evt.submitter, "Сохранить"));
  }
  avatarFormElement.addEventListener("submit", handleFormSubmitAvatar);
}

handleEditAvatar();

function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}