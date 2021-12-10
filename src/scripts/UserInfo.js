export default class UserInfo {
    constructor({name, info}) {
        this._userName = document.querySelector(name);
        this._userInfo = document.querySelector(info);
    }

    // метод, возвращающий объект с данными пользователя
    getUserInfo() {
        const userListInfo = {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        };
        return userListInfo;
    }

    // метод, принимающий новые данные пользователя и добавляет их на страницу
    setUserInfo({name, info}) {
        this._userName.textContent = name;
        this._userInfo.textContent = info;
    }
}