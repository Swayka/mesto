export class UserInfo {
  constructor({ nameSelector, infoSelector, profileAvatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }
  //возвращает объект с данными пользователя.
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._info.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._info.textContent = item.about;
    this._userId = item._id;
    this._avatar.src = item.avatar;
  }

  setAvatar(item) {
    if(item.avatar) this._avatar.src = item;
  }
}