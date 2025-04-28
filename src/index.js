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
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const imageText = popupOpenImage.querySelector('.popup__caption');

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
  placesList.prepend(createCard(newCard, removeCard, openImage, likeCard));
  closeModal(popupNewCard);
  formNewCardElement.reset();
}

function openImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  imageText.textContent = name;
  openModal(popupOpenImage);
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, removeCard, openImage, likeCard));
});

modals.forEach((modal) => {
  modal.classList.add('popup_is-animated');
  modal.querySelector('.popup__close').addEventListener('click', () => {
    closeModal(modal);
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


