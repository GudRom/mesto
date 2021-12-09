export const initialCards = [{
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

export const ESC_CODE = "Escape";
export const addButton = document.querySelector('.wanderer__add-button');
export const editButton = document.querySelector('.wanderer__edit-button');
export const formPopup = document.querySelector('.popup__form');
export const inputName = formPopup.querySelector('[name=input-name]');
export const inputJob = formPopup.querySelector('[name=input-job]');
export const formEditCard = document.querySelector('[name=edit-profile]');
export const formAddCard = document.querySelector('[name=add-card]');
export const inputTitle = document.querySelector('[name=input-title]');
export const inputURL = document.querySelector('[name=input-url]');
export const userProfile = {
    name: '.wanderer__name',
    info: '.wanderer__subtitle'
}
export const config = {
formSelector: '.popup__form',
inputSelector: '.popup__form-text',
inputErrorClass: 'popup__form-error',
saveButtonSelector: '.popup__save-button',
inactiveButtonClass: 'popup__save-button_disable',
cardsBoxSelector: '.place__boxes',
popupEditCardSelector: '.popup_edit',
popupAddCardSelector: '.popup_add',
popupEnlagerSelector: '.popup_enlager',
templateSelector: '.template',
boxSelector: '.place__box',
popupImgSelector: '.popup__image',
popupCaptionSelector: '.popup__caption',
photoSelector: '.place__photo',
titleSelector: '.place__title',
likeSelector: '.place__like',
deleteSelector: '.place__delete'
}