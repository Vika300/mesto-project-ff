import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js';
import { getUserDataApi, getInitialCardsApi, updateUserDataApi, addNewCardsApi, updateAvatarApi } from './components/api.js';
import { clearValidation, enableValidation } from './components/validation.js';

const placesList = document.querySelector('.places__list');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileEditOpen = document.querySelector('.profile__edit-button');
const formProfileEditElement = popupProfileEdit.querySelector('.popup__form');
const popupAvatarEdit = document.querySelector('.popup_type_avatar_edit')
const formAvatarEditElement = popupAvatarEdit.querySelector('.popup__form');
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
const avatarUrlInput = popupAvatarEdit.querySelector('.popup__input_type_url')
const profileImageElement = document.querySelector('.profile__image');
const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId = null;

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(true, formProfileEditElement);
  updateUserDataApi(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closeModal(popupProfileEdit);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, formProfileEditElement);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formNewCardElement); 
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
    likes: [],
    owner: {
      _id: userId
    }
  };
  addNewCardsApi(cardNameInput.value, cardUrlInput.value)
    .then((post) => {
      newCard._id = post._id;
      placesList.prepend(createCard(newCard, removeCard, openImage, likeCard, userId));
      closeModal(popupNewCard);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, formNewCardElement);
    });
}

function handleAvatarEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formAvatarEditElement);
  updateAvatarApi(avatarUrlInput.value)
    .then((res) => {
      profileImageElement.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupAvatarEdit);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      renderLoading(false, formAvatarEditElement);
    });
}

function openImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  imageText.textContent = name;
  openModal(popupOpenImage);
}

function renderLoading(isLoading, formElement) {
  const formButton = formElement.querySelector('.popup__button');
  if (isLoading) {
    formButton.textContent = 'Сохранить...';
  } else {
    formButton.textContent = 'Сохранить';
  }
}

enableValidation(validationConfig);

Promise.all([getUserDataApi(), getInitialCardsApi()])
  .then(([userData, initialCards]) => {
    profileTitleElement.textContent = userData.name;
    profileDescriptionElement.textContent = userData.about;
    profileImageElement.style.backgroundImage = `url(${userData.avatar})`;
    userId = userData._id;

    initialCards.forEach(function(element) {
      placesList.append(createCard(element, removeCard, openImage, likeCard, userId));
    });
  })
  .catch((error) => console.log(error));

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
  formProfileEditElement.reset();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formProfileEditElement, validationConfig);
  openModal(popupProfileEdit);
});

profileImageElement.addEventListener('click', function() {
  formAvatarEditElement.reset();
  clearValidation(formAvatarEditElement, validationConfig);
  openModal(popupAvatarEdit);
});

popupNewCardOpen.addEventListener('click', function() {
  formNewCardElement.reset();
  clearValidation(formNewCardElement, validationConfig);
  openModal(popupNewCard);
});

formProfileEditElement.addEventListener('submit', handleEditProfileFormSubmit);
formNewCardElement.addEventListener('submit', handleAddCardFormSubmit);
formAvatarEditElement.addEventListener('submit', handleAvatarEditFormSubmit)
