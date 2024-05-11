import { removeCard, addLikeCard, removeLikeCard } from "./api";

export function deleteCard(evt, cardId) {
  console.log(evt);
  console.log("тесты");
  removeCard(cardId)
    .then(evt.remove())
    .catch((err) => console.error(`Ошибка тест: ${err}`));
}

export function createCard(element,deleteCard,likeCard,openModalImage,userId) {
  const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = element.link;
  card.querySelector(".card__image").alt = element.alt;
  card.querySelector(".card__title").textContent = element.name;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (element.owner._id !== userId) {
    cardDeleteButton.remove();
  }
  //cardDeleteButton.addEventListener("click", () => deleteCard(card));
  card.id = element._id;
  //console.log(card.id);
  cardDeleteButton.addEventListener("click", () =>
    deleteCard(card, element._id)
  );
  const likeNumber = element.likes.length;
  const likeNumberNode = card.querySelector(".like-button__number");
  likeNumberNode.textContent = likeNumber;
  const likeButton = card.querySelector(".card__like-button");
  checkMyLike(element, likeButton, userId);
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, element._id, likeNumberNode)
  );
  const editImage = card.querySelector(".card__image");
  editImage.addEventListener("click", () => openModalImage(card));
  return card;
}

export const likeCard = (likeButton, cardId, likeNumberNode) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    //const likes = card.querySelector(".like-button__number");
    //console.log(likeButton);
    addLikeCard(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        const likeNumber = res.likes.length;
        likeNumberNode.textContent = likeNumber;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else {
    removeLikeCard(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        const likeNumber = res.likes.length;
        likeNumberNode.textContent = likeNumber;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
};

const checkMyLike = (element, likeButton, userId) => {
  element.likes.forEach((arrayItem) => {
    if (arrayItem._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
};
