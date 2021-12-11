import './index.css';

import {
    config,
    initialCards,
    userProfile,
    editButton,
    addButton,
    formAddCard,
    formEditCard,
    inputName,
    inputJob
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

const addFormValidator = new FormValidator(config, formAddCard);
const editFormValidator = new FormValidator(config, formEditCard);
const popupWithImage = new PopupWithImage(config, config.popupEnlagerSelector);
const userInfo = new UserInfo(userProfile);

const createCardItem = (item) => {
    const card = new Card(config, item, config.templateSelector, popupWithImage.open);
    const cardElement = card.createCard();
    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCardItem(item));
    }
}, config.cardsBoxSelector);

const popupWithAddForm = new PopupWithForm(config, {
    submiter: (input) => {
        cardList.prependItem(createCardItem(input));
        popupWithAddForm.close();
    }
}, config.popupAddCardSelector);

const popupWithEditForm = new PopupWithForm(config, {
    submiter: (input) => {
        userInfo.setUserInfo(input);
        popupWithEditForm.close();
    }
}, config.popupEditCardSelector);

popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithImage.setEventListeners();

editButton.addEventListener('click', () => {
    const userInfoObj = userInfo.getUserInfo();
    inputName.value = userInfoObj.name;
    inputJob.value = userInfoObj.info;
    editFormValidator.resetValidation();
    popupWithEditForm.open();
});


addButton.addEventListener('click', () => {
    addFormValidator.resetValidation();
    popupWithAddForm.open();
});

cardList.renderItems();

addFormValidator.enableValidation();
editFormValidator.enableValidation();