export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
}
  
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClose);
}

function escClose (e) {
	if(e.key === 'Escape') {
    const currentModal = document.querySelector('.popup_is-opened');
    closeModal(currentModal);
  }
}