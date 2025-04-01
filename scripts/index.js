const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(element, removeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  removeCard(cardDeleteButton);
  return cardElement;
}

function removeCard(button) {
  button.addEventListener('click', function () {
    const card = button.closest('.places__item');
    if (card) {
      card.remove();
    }
  });
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, removeCard));
});
