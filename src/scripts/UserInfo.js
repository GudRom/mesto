import { inputName, inputJob } from "../utils/constants.js";

export default class UserInfo {
    constructor({name, info}) {
        this._userName = document.querySelector(name);
        this._userInfo = document.querySelector(info);
    }

    // метод, возвращающий объект с данными пользователя
    getUserInfo() {
        const userListInfo = {
            name: inputName.value = this._userName.textContent,
            info: inputJob.value = this._userInfo.textContent
        };
        return userListInfo;
    }

    // метод, принимающий новые данные пользователя и добавляет их на страницу
    setUserInfo() {
        this._userName.textContent = inputName.value;
        this._userInfo.textContent = inputJob.value;
    }
}