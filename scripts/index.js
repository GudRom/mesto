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
const quitPopupEdit = document.querySelector('.popup_close_edit');
const quitPopupAdd = document.querySelector('.popup_close_add');
const quitPopupEnlager = document.querySelector('.popup_close_enlager');
const formEditCard = document.querySelector('[name=edit-profile]');
const formAddCard = document.querySelector('[name=add-card]');
const inputTitle = document.querySelector('[name=input-title]');
const inputURL = document.querySelector('[name=input-url]');
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
    if (elementPopup.classList.contains('popup_edit')) {
        elementPopup.classList.add('popup_active');
        inputName.value = nameWanderer.textContent;
        inputJob.value = jobWanderer.textContent;
    } else {
        elementPopup.classList.add('popup_active');
    }
}

function closePopup(elementPopup) {
    elementPopup.classList.remove('popup_active');
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.place__box').cloneNode(true);
    cardElement.querySelector('.place__photo').setAttribute('src', card.link);
    cardElement.querySelector('.place__photo').setAttribute('alt', card.name);
    cardElement.querySelector('.place__title').textContent = card.name;
    cardElement.querySelector('.place__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('place__like_active');
    });
    cardElement.querySelector('.place__delete').addEventListener('click', (evt) => {
        cardElement.remove();
    });
    cardElement.querySelector('.place__photo').addEventListener('click', (evt) => {
        const popupImg = document.querySelector('.popup__image');
        const popupCaption = document.querySelector('.popup__caption')
        popupImg.setAttribute('src', card.link);
        popupImg.setAttribute('alt', card.name);
        popupCaption.textContent = card.name;
        openPopup(popupEnlager);
    })
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

initialCards.forEach(appendCard)

editButton.addEventListener('click', (evt) => {
    openPopup(popupEditCard);
});

quitPopupEdit.addEventListener('click', (evt) => {
    closePopup(popupEditCard);
});

addButton.addEventListener('click', (evt) => {
    openPopup(popupAddCard);
});

quitPopupAdd.addEventListener('click', (evt) => {
    closePopup(popupAddCard);
});

quitPopupEnlager.addEventListener('click', (evt) => {
    closePopup(popupEnlager);
});

formEditCard.addEventListener('submit', submitForm);
formAddCard.addEventListener('submit', submitAddForm);