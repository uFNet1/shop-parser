import { CardMessage, CardPhoto } from "../types";

export function createItemCard(
  name: string,
  // description: string,
  price: number,
  cardPrice: number | null,
  oldPrice: number | null
): CardMessage {
  if (cardPrice === null && oldPrice === null) {
    return {
      text:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (typeof cardPrice === "number" && typeof oldPrice === "number") {
    return {
      text:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн* \\(~${formatNumber(
          oldPrice
        )} грн~\\)\n` +
        `💳 З картою АТБ: *${formatNumber(cardPrice)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (typeof cardPrice === "number" && oldPrice === null) {
    return {
      text:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n` +
        `💳 З картою АТБ: *${formatNumber(cardPrice)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (cardPrice === null && typeof oldPrice === "number") {
    return {
      text:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн* \\(~${formatNumber(
          oldPrice
        )} грн~\\)\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else {
    return {
      text:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  }
}

export function createItemCardPhoto(
  photoUrl: string,
  name: string,
  // description: string,
  price: number,
  cardPrice: number | null,
  oldPrice: number | null
): CardPhoto {
  if (cardPrice === null && oldPrice === null) {
    return {
      photo: photoUrl,
      caption:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (typeof cardPrice === "number" && typeof oldPrice === "number") {
    return {
      photo: photoUrl,
      caption:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн* \\(~${formatNumber(
          oldPrice
        )} грн~\\)\n` +
        `💳 З картою АТБ: *${formatNumber(cardPrice)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (typeof cardPrice === "number" && oldPrice === null) {
    return {
      photo: photoUrl,
      caption:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n` +
        `💳 З картою АТБ: *${formatNumber(cardPrice)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else if (cardPrice === null && typeof oldPrice === "number") {
    return {
      photo: photoUrl,
      caption:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн* \\(~${formatNumber(
          oldPrice
        )} грн~\\)\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  } else {
    return {
      photo: photoUrl,
      caption:
        `🏷 *${escapeMarkdown(name)}*\n` +
        `💰 Ціна: *${formatNumber(price)} грн*\n`,
      options: {
        parse_mode: "MarkdownV2",
      },
    };
  }
}

export function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
function formatNumber(v: number) {
  return v.toFixed(2).replace(".", "\\.");
}
