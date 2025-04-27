
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');

export function createCard(element, removeCard, openModal, likeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function () {
    removeCard(cardElement);
  });
  cardImage.addEventListener('click', function () {
    const img = popupImage.querySelector('.popup__image');
    img.src = element.link;
    img.alt = element.name;
    const text = popupImage.querySelector('.popup__caption');
    text.innerHTML = element.name;
    openModal(popupImage);
  });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function () {
    likeCard(cardLikeButton)
  });

  return cardElement;
}
    
export function removeCard(card) {
  if (card) {
    card.remove();
  }
}
  
export function likeCard(card) {
  if (card) {
    card.classList.toggle('card__like-button_is-active');
  }
}