import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './scripts/cards.js';

const addIcon = new URL('./images/add-icon.svg', import.meta.url);
const avatar = new URL('./images/avatar.jpg', import.meta.url);
const cardOne = new URL('./images/card_1.jpg', import.meta.url);
const cardTWo = new URL('./images/card_2.jpg', import.meta.url);
const cardThree = new URL('./images/card_3.jpg', import.meta.url);
const close = new URL('./images/close.svg', import.meta.url);
const deleteIcon = new URL('./images/delete-icon.svg', import.meta.url);
const editIcon = new URL('./images/edit-icon.svg', import.meta.url);
const likeActive = new URL('./images/like-active.svg', import.meta.url);
const likeInactive = new URL('./images/like-inactive.svg', import.meta.url);
const logo = new URL('./images/logo.svg', import.meta.url);

const placesList = document.querySelector('.places__list');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditOpen = document.querySelector('.profile__edit-button');
const formProfileEditElement = popupProfileEdit.querySelector('.popup__form');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const formNewCardElement = popupNewCard.querySelector('.popup__form');
const modals = document.querySelectorAll('.popup');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector('.popup__input_type_description');
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name')
const cardUrlInput = popupNewCard.querySelector('.popup__input_type_url')

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  const fieldTitle = nameInput.value;
  const fieldDescription = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  profileTitle.textContent = fieldTitle;
  profileJob.textContent = fieldDescription;

  const currentModal = document.querySelector('.popup_is-opened');
  closeModal(currentModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault(); 
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  placesList.insertBefore(createCard(newCard, removeCard, openModal, likeCard), placesList.firstChild);

  const currentModal = document.querySelector('.popup_is-opened');
  closeModal(currentModal);
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

initialCards.forEach(function(element) {
  placesList.append(createCard(element, removeCard, openModal, likeCard));
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('popup__close')|| event.target.classList.contains('popup')) {
      closeModal(modal);
    }
  })
})

popupProfileEditOpen.addEventListener('click', function() {
  const profileTitle = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupProfileEdit);
});

popupNewCardOpen.addEventListener('click', function() {
  openModal(popupNewCard);
});

formProfileEditElement.addEventListener('submit', handleEditProfileFormSubmit);
formNewCardElement.addEventListener('submit', handleAddCardFormSubmit);


