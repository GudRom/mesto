class Card {
    constructor(data, cardSelector, openEnlagePhoto) {
        this._cardSelector = cardSelector;
        this._link = data.link;
        this._name = data.name;
        this._openEnlagePhoto = openEnlagePhoto;
        this._remove = this._remove.bind(this)
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.place__box')
            .cloneNode(true);

        return cardElement;
    }

    _remove() {
        this._element.remove();
    }
    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.place__photo').setAttribute('src', this._link);
        this._element.querySelector('.place__photo').setAttribute('alt', this._name);
        this._element.querySelector('.place__title').textContent = this._name;
        this._element.querySelector('.place__like').addEventListener('click', this._likeCard);
        this._element.querySelector('.place__delete').addEventListener('click', this._remove);
        this._element.querySelector('.place__photo').addEventListener('click', this._openEnlagePhoto);
        return this._element;
    }

    _likeCard = (evt) => {
        evt.target.classList.toggle('place__like_active');
    }
}


export default Card;