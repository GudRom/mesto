import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const ESC_CODE = "Escape";
const popupEditCard = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const popupEnlager = document.querySelector('.popup_enlager');
const addButton = document.querySelector('.wanderer__add-button');
const editButton = document.querySelector('.wanderer__edit-button');
const formPopup = document.querySelector('.popup__form');
const inputName = formPopup.querySelector('[name=input-name]');
const inputJob = formPopup.querySelector('[name=input-job]');
const nameWanderer = document.querySelector('.wanderer__name');
const jobWanderer = document.querySelector('.wanderer__subtitle');
const formEditCard = document.querySelector('[name=edit-profile]');
const formAddCard = document.querySelector('[name=add-card]');
const inputTitle = document.querySelector('[name=input-title]');
const inputURL = document.querySelector('[name=input-url]');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardsBox = document.querySelector('.place__boxes');
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-text',
    inputErrorClass: 'popup__form-error',
    saveButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable'
}
const addFormValidator = new FormValidator(config, formAddCard);
const editFormValidator = new FormValidator(config, formEditCard);

function openEnlagePhoto(evt) {
    popupImg.setAttribute('src', evt.target.src);
    popupImg.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = evt.target.alt;
    openPopup(popupEnlager);
}

function openPopup(elementPopup) {
    elementPopup.classList.add('popup_active');
    elementPopup.addEventListener('mouseup', closeByClickPopup);
    document.addEventListener('keydown', escapePopup);
}

function closePopup(elementPopup) {
    elementPopup.classList.remove('popup_active');
    elementPopup.removeEventListener('mouseup', closeByClickPopup);
    document.removeEventListener('keydown', escapePopup);
}

function setValueWandererPopup() {
    inputName.value = nameWanderer.textContent;
    inputJob.value = jobWanderer.textContent;
}

function submitForm(evt) {
    evt.preventDefault();
    nameWanderer.textContent = inputName.value;
    jobWanderer.textContent = inputJob.value;
    closePopup(popupEditCard);
};

function submitAddForm(evt) {
    evt.preventDefault();
    const dataCard = {
        name: inputTitle.value,
        link: inputURL.value
    };
    prependCard(dataCard);
    closePopup(popupAddCard);
    evt.target.reset();
};

function appendCard(item) { 
    const card = new Card(item, '.template', openEnlagePhoto);
    const cardElement = card.createCard();
    cardsBox.append(cardElement);
}

function prependCard(item) {
    const card = new Card(item, '.template', openEnlagePhoto);
    const cardElement = card.createCard();
    cardsBox.prepend(cardElement);
}

function escapePopup(evt) {
    if (evt.key === ESC_CODE) {
        const activePopup = document.querySelector('.popup_active');
        closePopup(activePopup);
    }
}

function closeByClickPopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__quit-button')) {
        const activePopup = document.querySelector('.popup_active');
        closePopup(activePopup);
    }
}

initialCards.forEach(appendCard)

editButton.addEventListener('click', () => {
    setValueWandererPopup();
    openPopup(popupEditCard);
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
});

formEditCard.addEventListener('submit', submitForm);
formAddCard.addEventListener('submit', submitAddForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();