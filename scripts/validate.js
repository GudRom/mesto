const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-text',
    inputErrorClass: 'popup__form-error',
    saveButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disable'
}

function enableValidation(formConfig) {
    const forms = [...document.querySelectorAll(formConfig.formSelector)];
    forms.forEach((form) => setEventListeners(form, formConfig));
}

function setEventListeners(form, config) {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => setSaveButtonState(form, config));
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => checkInputValidation(inputElement, form, config))
    });
    setSaveButtonState(form, config);
}

function showError(inputElement, form, config) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, form, config) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

function checkInputValidation(inputElement, form, config) {
    if (!inputElement.validity.valid) {
        showError(inputElement, form, config);
    } else {
        hideError(inputElement, form, config);
    }
}

function setSaveButtonState(form, config) {
    const button = form.querySelector(config.saveButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function handleSubmit(evt) {
    evt.preventDefault();
}

enableValidation(config);