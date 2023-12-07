import ProductItemDto from "./product-item.dto";
import ProductDto from "./product.dto";

export default class OrderItemDto {
  constructor(
    private _product: ProductDto,
    private _quantity: number,
    private _extras: ProductItemDto[],
    private _notes: string = "",
  ) {}

  addQuantity() {
    this._quantity = this._quantity++;
  }

  subtractQuantity() {
    this._quantity = this._quantity - 1;
  }

  addProductItem(productItem: ProductItemDto) {
    this._extras.push(productItem);
  }

  removeProductItem(productItem: ProductItemDto) {
    this._extras = this._extras.filter(
      (item) => item.name !== productItem.name,
    );
  }

  get product() {
    return this._product;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(q: number) {
    this._quantity = q;
  }

  get extras() {
    return this._extras;
  }

  get notes() {
    return this._notes;
  }

  set notes(newNotes: string) {
    this._notes = newNotes;
  }

  get subtotal() {
    return (
      this.product.price * this.quantity +
      this.extras.reduce((acc, productItem) => acc + productItem.price, 0)
    );
  }
}
