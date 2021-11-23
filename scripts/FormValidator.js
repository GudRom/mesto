class FormValidator {
    constructor(config, formName) {
        this._config = config;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._saveButtonSelector = config.saveButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._formName = formName;
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, this._formName, this._config);
        } else {
            this._hideInputError(inputElement, this._formName, this._config);
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
        const button = this._formName.querySelector(this._saveButtonSelector);
        button.disabled = !this._formName.checkValidity();
        button.classList.toggle(this._inactiveButtonClass, !this._formName.checkValidity());
    }

    _setEventListeners() {
        this._formName.addEventListener('submit', this._handleSubmit);
        this._formName.addEventListener('input', () => this._setSaveButtonState(this._formName, this._config));
        const inputs = [...this._formName.querySelectorAll(this._inputSelector)];
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => this._checkInputValidity(inputElement, this._formName, this._config))
        });
        this._setSaveButtonState(this._formName, this._config);
    }

    enableValidation() {
        const forms = [...document.querySelectorAll(this._formSelector)];
        forms.forEach((form) => this._setEventListeners(form, this._config));
    }

    _handleSubmit =(evt) =>{
        evt.preventDefault();
    }
}

export default FormValidator;