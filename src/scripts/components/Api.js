export class Api {
  constructor({ url, headers }) {
    this._headers = headers;
    this._url = url;
  }

  _getRes(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  editUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      }),
    })
    .then(this._getRes);
  }

  newCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then(this._getRes);
  }

  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  removeLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._getRes);
  }

  editAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      }),
    })
    .then(this._getRes);
  }
}