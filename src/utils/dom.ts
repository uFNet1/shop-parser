import jsdom from "jsdom";
const { JSDOM } = jsdom;


export async function fetchLink(url: string) {
  const response = await fetch(url);

  if (response.ok) {
    const json = await response.text();
    const dom = parseDOM(json);
    return dom
  } else {
    console.error(`Can't fetch ${url} status ${String(response.status)}`);
    return null;
  }
}
export async function fetchQueryPage(url: string, query: number) {
  const response = await fetch(`${url}${String(query)}`);

  if (response.ok) {
    const json = await response.text();
    const dom = parseDOM(json);
    return dom
  } else {
    console.error(`Can't fetch ${url} status ${String(response.status)}`);
    return null;
  }
}
function parseDOM(html: string) {
  const dom = new JSDOM(html);
  return dom;
}

