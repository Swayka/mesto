export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
    ;
  }
  //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
   }
  //отрисовка всех элементов
  renderItems() {
      this._items.forEach((item) => { 
        this._renderer(item);
      })
    }

}