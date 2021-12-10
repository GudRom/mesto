import {ESC_CODE} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // метод открытия попапа
    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }

    // метод закрытия попапа 
    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //метод закрытия попапа кнопкой ESC
    _handleEscClose = (evt) =>{
        if (evt.key === ESC_CODE) {
            this.close();
        }
    }

    // метод, добавляющий слушатель на закрытие попапа по крестику или на затемненную область
    setEventListeners() {
        this._popup.addEventListener('mouseup', this._closeByClick);
    }

    _closeByClick = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__quit-button')) {
            this.close();
    } 
}
}