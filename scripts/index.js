function createCard(element, deleteCard) {
  const card = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = element.link;
  card.querySelector(".card__image").alt = element.alt;
  card.querySelector(".card__title").textContent = element.name;

  const cardDeleteButton = card.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => deleteCard(card));

  return card;
}

const deleteCard = (card) => card.remove();

initialCards.forEach((arrayItem) => {
  const placesList = document.querySelector(".places__list");
  placesList.append(createCard(arrayItem, deleteCard));
});
