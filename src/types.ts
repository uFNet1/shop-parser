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
