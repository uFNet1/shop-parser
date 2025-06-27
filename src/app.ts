const url =
  "https://www.atbmarket.com/product/moloko-15-g-den-u-den-nezbirane-zgusene-z-cukrom-85-stik";
const response = await fetch(url);

if (response.ok) {
  // если HTTP-статус в диапазоне 200-299
  // получаем тело ответа (см. про этот метод ниже)
  const json = await response.text();
  console.log(findPriceData(json));
} else {
  console.log("Ошибка HTTP: " + response.status);
}
function findPriceData(html: string) {
  const splitText = html.split("\n", 150);
  const joinText = splitText.join(" ");

  const startText = `<script nonce="abcdefg" type="application/ld+json">{"@context":"https://schema.org/","@type":"Product",`;
  const endText = "</script>";

  return findLogic(joinText, startText, endText);
}
function findActionLabel(html: string) {
  const searchFor = `class="custom-product-label">`;
  const closingTag = `</span>`;
}
function findLogic(html: string, searchForStart: string, searchForEnd: string) {
  const startIndex = html.indexOf(searchForStart);
  const text = html.slice(startIndex + searchForStart.length);
  const endIndex = text.indexOf(searchForEnd);
  const data = text.slice(0, endIndex);
  // console.log(JSON.parse("{" + data));
  return data;
}
