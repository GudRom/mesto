export default class Card {
    constructor(config, data, cardSelector, openPopupWithImage, id, {handleDeletePopup, likeCard, dislikeCard}) {
        this._config = config;
        this._cardSelector = cardSelector;
        this._link = data.link;
        this._name = data.name;
        this._cardId = data._id;
        this._id = data.owner._id;
        this._myId = id;
        this._likes = data.likes;
        this._openPopupWithImage = openPopupWithImage.bind(this);
        this._handleDeletePopup = handleDeletePopup.bind(this);
        this._likeCard = likeCard.bind(this);
        this._dislikeCard = dislikeCard.bind(this);
        this.remove = this.remove.bind(this);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(this._config.boxSelector)
            .cloneNode(true);

        return cardElement;
    }

    remove() {
        this._element.remove();
    }
    createCard() {
        this._element = this._getTemplate();
        this._likeElement = this._element.querySelector(this._config.likeSelector);
        this._element.querySelector(this._config.photoSelector).setAttribute('src', this._link);
        this._element.querySelector(this._config.photoSelector).setAttribute('alt', this._name);
        this._element.querySelector(this._config.titleSelector).textContent = this._name;
        this._element.querySelector(this._config.likeCounterSelector).textContent = this._likes.length;
        this._setEventListeners();
        this._checkOwnLikes();
        return this._element;
    }

    checkLikesAmount(data) {
        this._element.querySelector(this._config.likeCounterSelector).textContent = data.likes.length;
    }

    _setEventListeners = () => {
        if (this._id === this._myId) {
            this._element.querySelector(this._config.deleteSelector).addEventListener('click', () => { this._handleDeletePopup(this._element) });
        } else {
            this._element.querySelector(this._config.deleteSelector).remove();
        }
        this._likeElement.addEventListener('click', () => {
            if (this._likeElement.classList.contains('place__like_active')) {
                this._dislike(this._cardId);
            } else {
                this._like(this._cardId);
            }
        });
        this._element.querySelector(this._config.photoSelector).addEventListener('click', this._handleCardClick);
    }

    _checkOwnLikes() {
        if (this._likes.some(({_id}) => _id === this._myId)) {
            this._addClassLike();
        }
    }

    _like(id) {
        this._addClassLike();
        this._likeCard(id);
    }

    _dislike(id) {
        this._removeClassLike();
        this._dislikeCard(id);
    }

    _addClassLike() {
        this._likeElement.classList.add('place__like_active');
    }

    _removeClassLike = () => {
        this._likeElement.classList.remove('place__like_active');
    }

    _handleCardClick = () => {
        this._openPopupWithImage({name: this._name, link: this._link});
    }
}
