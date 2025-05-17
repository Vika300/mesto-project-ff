import { deleteCardsApi, likeCardApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(element, removeCard, openImage, likeCard, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  if (userId === element.owner._id) {
    cardDeleteButton.addEventListener('click', function () {
      removeCard(cardElement, element._id);
    })
  } else {
    cardDeleteButton.remove()
  }
  cardImage.addEventListener('click', function () {
    openImage(element.link, element.name);
  });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const isLiked = element.likes.some(like => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeCount.textContent = element.likes.length;
  cardLikeButton.addEventListener('click', function () {
    likeCard(cardLikeButton, element._id, cardLikeCount);
  });

  return cardElement;
}
    
export function removeCard(card, cardId) {
  if (card) {
    deleteCardsApi(cardId)
      .then((res) => {
        card.remove();
      })
      .catch((error) => console.log(error));
  }
}
  
export function likeCard(button, cardId, counter) {
  const isLiked = button.classList.contains('card__like-button_is-active');
  if (button) {
    likeCardApi(cardId, isLiked)
      .then((res) => {
        counter.textContent = res.likes.length;
        button.classList.toggle('card__like-button_is-active');
      })
      .catch((error) => console.log(error))
  }
}