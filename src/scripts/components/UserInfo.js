export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }
  //возвращает объект с данными пользователя.
  getUserInfo() {
    this._data = {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent
    }
    return this._data;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, info}) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }
}