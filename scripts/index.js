const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(element, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function () {
    removeCard(cardElement);
  });
  return cardElement;
}

function removeCard(card) {
    if (card) {
      card.remove();
    }
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, removeCard));
});
