export default class Currency {
  constructor(
    private readonly value: number,
    private readonly currency = "BRL",
    private readonly locale = "pt-BR",
  ) {
    this.value = value;
    this.currency = currency;
    this.locale = locale;
  }

  formatCurrency() {
    return this.value.toLocaleString(this.locale, {
      style: "currency",
      currency: this.currency,
    });
  }
}

export const formatCurrency = (value: number) =>
  new Currency(value).formatCurrency();
