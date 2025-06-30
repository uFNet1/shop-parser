export function sanitizeLink(link: string) {
  const searchFor = "product/";
  return link.slice(link.indexOf(searchFor) + searchFor.length, -1);
}
