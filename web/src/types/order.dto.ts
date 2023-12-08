import OrderItemDto from "./order-item.dto";

export default class OrderDto {
  constructor(
    private _items: OrderItemDto[],
    private _clientName: string,
    private _code: string,
  ) {}

  get items() {
    return this._items;
  }

  set items(newItems) {
    this._items = newItems;
  }

  get clientName() {
    return this._clientName;
  }

  get code() {
    return this._code;
  }

  get price() {
    return this.items.reduce((acc, orderItem) => acc + orderItem.subtotal, 0);
  }
}
