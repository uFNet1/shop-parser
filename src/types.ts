export interface ItemDataModel {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemAtbCardPrice: number | null;
  itemNonActionPrice: number | null;
  itemPhoto: string | null;
  itemLink: string;
}
export interface CardMessage {
  text: string;
  options: { parse_mode: "MarkdownV2" };
}
export interface CardPhoto {
  photo: string;
  caption: string;
  options: { parse_mode: "MarkdownV2" };
}

export interface CartDataObject {
  weight: number;

  totalSum: number; //price with discount
  totalAtbCard: number; //price with atb card

  dicsountSimple: number; //discount amount
  discountProductCoupon: number;
  totalOffDiscount: number; //price without discount
  cashbackSum: number;
  deliveryCost: number;
}

export interface ParserData {
  id: string | null,
  price: string | null,
  oldPrice: string | null,
  priceAtbCard: string | null,
}

  
