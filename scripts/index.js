const popup = document.querySelector('.popup');
const quitButton = document.querySelector('.popup__quit-button');
const editButton = document.querySelector('.wanderer__edit-button');
const form = document.querySelectorAll('popup__form-text')

function popupOpen() {
    popup.classList.add('popup_active')
}

function popupClose() {
    popup.classList.remove('popup_active')
}

editButton.addEventListener('click', popupOpen);
quitButton.addEventListener('click', popupClose);
form.addEventListener('submit', function(event) {
    event.preventDefault()
    popupClose();
})