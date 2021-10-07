const popup = document.querySelector('.popup');
const quitButton = document.querySelector('.popup__quit-button');
const editButton = document.querySelector('.wanderer__edit-button');
const formPopup = document.querySelector('.popup__form');
const inputName = formPopup.querySelector('[name=input-name]');
const inputJob = formPopup.querySelector('[name=input-job]');
const nameWanderer = document.querySelector('.wanderer__name');
const jobWanderer = document.querySelector('.wanderer__subtitle');

function openPopup() {
    popup.classList.add('popup_active')
    inputName.value = nameWanderer.textContent;
    inputJob.value = jobWanderer.textContent;
}

function closePopup() {
    popup.classList.remove('popup_active')
}

function submitForm(event) {
    event.preventDefault();
    nameWanderer.textContent = inputName.value;
    jobWanderer.textContent = inputJob.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
quitButton.addEventListener('click', closePopup);
formPopup.addEventListener('submit', submitForm);