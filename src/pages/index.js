import './index.css';

import {
    config,
    userProfile,
    editButton,
    addButton,
    formAddCard,
    formEditCard,
    inputName,
    inputJob,
    editAvatarButton,
    formEditAvatar,
    saveButtons,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';

const addFormValidator = new FormValidator(config, formAddCard);
const editFormValidator = new FormValidator(config, formEditCard);
const editAvatarFormValidator = new FormValidator(config, formEditAvatar);
const popupWithImage = new PopupWithImage(config, config.popupEnlagerSelector);
const userInfo = new UserInfo(userProfile);
const popupDeleteCard = new PopupDeleteCard(config, config.popupDeleteCardSelector, {
    submiter: () => {}
});
const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: 'e7c53c8e-b5d8-4719-b07e-61d4790752fd'
})

Promise.all([api.getUserData(), api.getCards()])
    .then(([userData, cards]) => {
        userInfo.setUserInfo(userData);
        cardList.renderItems(cards);
    })
    .catch(error => {
        console.log(error)
    });

const createCardItem = (item) => {
    const card = new Card(config, item, config.templateSelector, popupWithImage.open, userInfo.getUserInfo().id, {
        handleDeletePopup: (card) => {
            popupDeleteCard.open();
            popupDeleteCard.setSubmit(() => {
                api.deleteCard(item._id)
                    .then(() => {
                        card.remove();
                        popupDeleteCard.close()
                    })
                    .catch(error => console.log(error))
            })
        },
        likeCard: (id) => {
            api.addLike(id)
                .then((res) => {
                    card.checkLikesAmount(res)
                })
                .catch(error => console.log(error))
        },
        dislikeCard: (id) => {
            api.deleteLike(id)
                .then((res) => {
                    card.checkLikesAmount(res)
                })
                .catch(error => console.log(error))
        }
    });
    const cardElement = card.createCard();
    return cardElement;
}

const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCardItem(item));
    }
}, config.cardsBoxSelector);

const popupWithAddForm = new PopupWithForm(config, {
    submiter: (input) => {
        renderLoading(true);
        api.addNewCard(input)
            .then(res => {
                cardList.prependItem(createCardItem(res));
                renderLoading(false);
                popupWithAddForm.close()
            })
            .catch(error => console.log(error))
    }
}, config.popupAddCardSelector);

const popupWithEditForm = new PopupWithForm(config, {
    submiter: (data) => {
        renderLoading(true);
        api.editProfile(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                renderLoading(false);
                popupWithEditForm.close()
            })
            .catch(error => console.log(error))
    }
}, config.popupEditCardSelector);

const popupWithEditAvatarForm = new PopupWithForm(config, {
    submiter: (data) => {
        renderLoading(true);
        api.editAvatar(data)
            .then((res) => {
                userInfo.setUserInfo(res);
                renderLoading(false);
                popupWithEditAvatarForm.close()
            })
            .catch(error => console.log(error))
    }
}, config.popupEditAvatarSelector);

function renderLoading(isLoading) {
    if (isLoading) {
        saveButtons.forEach(btn => btn.textContent = "Сохранение...")
    } else {
        saveButtons.forEach(btn => btn.textContent = "Сохранение")
    }
}

popupDeleteCard.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithEditAvatarForm.setEventListeners();
popupWithImage.setEventListeners();

editButton.addEventListener('click', () => {
    const userInfoObj = userInfo.getUserInfo();
    inputName.value = userInfoObj.name;
    inputJob.value = userInfoObj.about;
    editFormValidator.resetValidation();
    popupWithEditForm.open();
});


addButton.addEventListener('click', () => {
    addFormValidator.resetValidation();
    popupWithAddForm.open();
});

editAvatarButton.addEventListener('click', () => {
    editAvatarFormValidator.resetValidation();
    popupWithEditAvatarForm.open();
});

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();