export function sanitizeLink(link: string) {
  const searchFor = "product/";
  const findIndex = link.indexOf(searchFor);
  if (findIndex === -1) {
    console.error("Can't sanitize link. Incorrect url " + link);
    return false;
  } else {
    return link.slice(findIndex + searchFor.length, -1);
  }
  
}
