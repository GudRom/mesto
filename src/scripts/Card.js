export default class Card {
    constructor(config, {link, name}, cardSelector, openPopupWithImage) {
        this._config = config;
        this._cardSelector = cardSelector;
        this._link = link;
        this._name = name;
        this._openPopupWithImage = openPopupWithImage.bind(this);
        this._remove = this._remove.bind(this);
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(this._config.boxSelector)
            .cloneNode(true);

        return cardElement;
    }

    _remove() {
        this._element.remove();
    }
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector(this._config.photoSelector).setAttribute('src', this._link);
        this._element.querySelector(this._config.photoSelector).setAttribute('alt', this._name);
        this._element.querySelector(this._config.titleSelector).textContent = this._name;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners = () => {
        this._element.querySelector(this._config.likeSelector).addEventListener('click', this._likeCard);
        this._element.querySelector(this._config.deleteSelector).addEventListener('click', this._remove);
        this._element.querySelector(this._config.photoSelector).addEventListener('click', this._handleCardClick);
    }

    _likeCard = (evt) => {
        evt.target.classList.toggle('place__like_active');
    }

    _handleCardClick = () => {
        this._openPopupWithImage({name: this._name, link: this._link});
    }
}
