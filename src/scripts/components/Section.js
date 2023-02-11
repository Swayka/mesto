export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    
  }
  //принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._container.prepend(item);
   }
  //отрисовка всех элементов
  renderItems(data) {
      data.reverse().forEach((item) => {
        this._renderer(item);
      });
  }
}