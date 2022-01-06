export default class Api {
    constructor({
        address,
        token
    }) {
        this.address = address;
        this.token = token;
    }

    getUserData() {
        return fetch(`${this.address}/users/me`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => this._checkResult(res))
    }

    getCards() {
        return fetch(`${this.address}/cards`, {
                headers: {
                    authorization: this.token
                }
            })
            .then(res => this._checkResult(res))
    }

    editProfile(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => this._checkResult(res))
    }

    editAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => this._checkResult(res))
    }

    addNewCard(data) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => this._checkResult(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.address}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
    }

    addLike(cardId) {
        return fetch(`${this.address}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
    }

    deleteLike(cardId) {
        return fetch(`${this.address}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: {
                    authorization: this.token,
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this._checkResult(res))
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }
}