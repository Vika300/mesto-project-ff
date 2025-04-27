export function openModal(modal) {
  modal.classList.add('popup_is-animated');
  setTimeout(function () {
    modal.classList.add('popup_is-opened');
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
  }, 50);
  document.addEventListener('keydown', escClose);
}
  
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.style.visibility = 'hidden';
  modal.style.opacity = '0';
}

function escClose (e) {
	if(e.key === 'Escape') {
    const currentModal = document.querySelector('.popup_is-opened');
    closeModal(currentModal);
  }
}