export default class FormValidator {
    constructor(config, formName) {
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._saveButtonSelector = config.saveButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._formName = formName;
        this._inputs = [...this._formName.querySelectorAll(this._inputSelector)];
        this._button = this._formName.querySelector(this._saveButtonSelector);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }


    _hideInputError(inputElement) {
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    }

    _setSaveButtonState() {
        this._button.disabled = !this._formName.checkValidity();
        this._button.classList.toggle(this._inactiveButtonClass, !this._formName.checkValidity());
    }

    _setEventListeners() {
        this._formName.addEventListener('submit', this._handleSubmit);
        this._formName.addEventListener('input', () => this._setSaveButtonState());
        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._checkInputValidity(inputElement))
        });
        this._setSaveButtonState();
    }

    enableValidation() {
        this._setEventListeners();
    }

    _handleSubmit =(evt) =>{
        evt.preventDefault();
    }

    resetValidation() {
        this._setSaveButtonState();
        this._inputs.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}