import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(config, {
        submiter
    }, popupSelector) {
        super(popupSelector);
        this._config = config;
        this._form = this._popup.querySelector(this._config.formSelector);
        this._submiter = submiter;
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submiter(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}