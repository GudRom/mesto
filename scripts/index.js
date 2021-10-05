const popup = document.querySelector('.popup');
const quitButton = document.querySelector('.popup__quit-button');
const editButton = document.querySelector('.wanderer__edit-button');
const formPopup = document.querySelector('.popup__form');
const textInput = formPopup.querySelectorAll('.popup__form-text');
const nameWanderer = document.querySelector('.wanderer__name');
const jobWanderer = document.querySelector('.wanderer__subtitle');

function popupOpen() {
    popup.classList.add('popup_active')
}

function popupClose() {
    popup.classList.remove('popup_active')
}


editButton.addEventListener('click', popupOpen);

quitButton.addEventListener('click', popupClose);

function submitForm(event) {
    event.preventDefault();
    nameWanderer.textContent = textInput[0].value;
    jobWanderer.textContent = textInput[1].value;
    popupClose();
}

formPopup.addEventListener('submit', submitForm);