import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(config, popupSelector, {
        submiter
    }) {
        super(popupSelector);
        this._config = config;
        this._submiter = submiter;
        this._form = this._popup.querySelector(this._config.formSelector);
    }


    open = () => {
        super.open();
    }

    setSubmit(func) {
        this._submiter = func;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submiter();
        });
    }
}