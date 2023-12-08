import OrderItemDto from "./order-item.dto";

export default class PreOrderDto {
  constructor(private _items: OrderItemDto[]) {}

  get items() {
    return this._items;
  }

  set items(newItems) {
    this._items = newItems;
  }

  get price() {
    return this.items.reduce((acc, orderItem) => acc + orderItem.subtotal, 0);
  }
}
