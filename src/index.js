import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './scripts/cards.js';

const placesList = document.querySelector('.places__list');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditOpen = document.querySelector('.profile__edit-button');
const formProfileEditElement = popupProfileEdit.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const formNewCardElement = popupNewCard.querySelector('.popup__form');
const modals = document.querySelectorAll('.popup');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_description');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = popupNewCard.querySelector('.popup__input_type_url')
const popupImage = document.querySelector('.popup_type_image');

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 

  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(popupProfileEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); 
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  placesList.prepend(createCard(newCard, removeCard, openImage, likeCard), placesList.firstChild);
  closeModal(popupNewCard);
  formNewCardElement.reset();
}

function openImage(element) {
  const img = popupImage.querySelector('.popup__image');
  img.src = element.link;
  img.alt = element.name;
  const text = popupImage.querySelector('.popup__caption');
  text.textContent = element.name;
  openModal(popupImage);
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, removeCard, openImage, likeCard));
});

modals.forEach((modal) => {
  modal.classList.add('popup_is-animated');
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')) {
      closeModal(modal);
    }
  })
  modal.addEventListener('mousedown', (event) => {
    if(event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  })
})

popupProfileEditOpen.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupProfileEdit);
});

popupNewCardOpen.addEventListener('click', function() {
  openModal(popupNewCard);
});

formProfileEditElement.addEventListener('submit', handleEditProfileFormSubmit);
formNewCardElement.addEventListener('submit', handleAddCardFormSubmit);


