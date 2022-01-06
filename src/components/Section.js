export default class Section {
    constructor({
        renderer
    }, cardSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(cardSelector);
    }

    // метод добавляющий элемент в контейнер
    addItem(element) {
        this._container.append(element);
    }

    prependItem(element) {
        this._container.prepend(element);
    }
    
    // метод отрисовки всех элементов
    renderItems(items) {
        items.forEach(item => {
            return this._renderer(item);
        });
    }
}