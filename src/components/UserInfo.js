export default class UserInfo {
    constructor({name, about, avatar}){
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }
    // метод, возвращающий объект с данными пользователя
    getUserInfo() {
        const userListInfo = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar,
            id: this._id
        };
        return userListInfo;
    }

    // метод, принимающий новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
        this._id = data._id;
    }
}