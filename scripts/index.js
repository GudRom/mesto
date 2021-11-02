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
const cardTemplate = document.querySelector('.template').content;
const cardsBox = document.querySelector('.place__boxes');
const quitPopupEdit = document.querySelector('.popup__close-edit');
const quitPopupAdd = document.querySelector('.popup__close-add');
const quitPopupEnlager = document.querySelector('.popup__close-enlager');
const formEditCard = document.querySelector('[name=edit-profile]');
const formAddCard = document.querySelector('[name=add-card]');
const inputTitle = document.querySelector('[name=input-title]');
const inputURL = document.querySelector('[name=input-url]');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
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

function openPopup(elementPopup) {
    elementPopup.classList.add('popup_active');
}

function closePopup(elementPopup) {
    elementPopup.classList.remove('popup_active');
}

function setValueWandererPopup() {
    inputName.value = nameWanderer.textContent;
    inputJob.value = jobWanderer.textContent;
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.place__box').cloneNode(true);
    const cardImage = cardElement.querySelector('.place__photo');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    cardElement.querySelector('.place__title').textContent = card.name;
    return cardElement;
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

function appendCard(card) {
    const cardElement = createCard(card)
    cardsBox.append(cardElement);
}

function prependCard(card) {
    const cardElement = createCard(card)
    cardsBox.prepend(cardElement);
}

function escapePopup(evt) {
    if (evt.key === ESC_CODE) {
        const activePopup = document.querySelector('.popup_active');
        closePopup(activePopup);
        evt.target.removeEventListener('keydown', escapePopup);
    }
}

function closeByClickPopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__quit-button')) {
        const activePopup = document.querySelector('.popup_active');
        closePopup(activePopup);
        evt.target.removeEventListener('mouseup', closeByClickPopup);
    }
}

function clickLike(evt) {
    if (evt.target.classList.contains('place__like')) {
        evt.target.classList.toggle('place__like_active');
    }
}

function removeCard(evt) {
    if (evt.target.classList.contains('place__delete')) {
        evt.target.parentElement.remove();
    }
}

function setImage(evt) {
    popupImg.setAttribute('src', evt.target.src);
    popupImg.setAttribute('alt', evt.target.alt);
    popupCaption.textContent = evt.target.alt;
}

function enlageImage(evt) {
    if(evt.target.classList.contains('place__photo')){
        console.log(evt.target);
        setImage(evt);
        openPopup(popupEnlager);
    }
}

initialCards.forEach(appendCard);

editButton.addEventListener('click', (evt) => {
    setValueWandererPopup();
    openPopup(popupEditCard);
});

addButton.addEventListener('click', (evt) => {
    openPopup(popupAddCard);
});

cardsBox.addEventListener('click', clickLike);
cardsBox.addEventListener('click', removeCard);
cardsBox.addEventListener('click', enlageImage);

document.addEventListener('mouseup', closeByClickPopup);
document.addEventListener('keydown', escapePopup);

formEditCard.addEventListener('submit', submitForm);
formAddCard.addEventListener('submit', submitAddForm);