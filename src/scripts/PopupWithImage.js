import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(config, popupSelector){
        super(popupSelector);
        this._config = config;
        this._popupImg = this._popup.querySelector(this._config.popupImgSelector);        
        this._popupCaption = this._popup.querySelector(this._config.popupCaptionSelector);
    }
    // перезаписываем родительский метод. вставляем картинку в попап.
    open = (item) => {
        this._popupImg.src = item.link;
        this._popupImg.alt = item.name;
        this._popupCaption.textContent = item.name;
        super.open();
    }
}