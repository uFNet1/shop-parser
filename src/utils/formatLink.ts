export function sanitizeLink(link: string) {
  const searchFor = "product/";
  const findIndex = link.indexOf(searchFor);
  const unnecessaryText = link.indexOf("?");
  if (findIndex === -1) {
    console.error("Can't sanitize link. Incorrect url " + link);
    return null;
  } else {
    return unnecessaryText !== -1
      ? link.slice(findIndex + searchFor.length, unnecessaryText)
      : link.slice(findIndex + searchFor.length);
  }
}

export function sanitizePhotoLink(link: string) {
  const searchFor = ".com/";
  const findIndex = link.indexOf(searchFor);
  if (findIndex === -1) {
    console.error("Can't sanitize link. Incorrect url " + link);
    return null;
  } else {
    return link.slice(findIndex + searchFor.length);
  }
}

export function restoreLink(link: string) {
  const append = "https://www.atbmarket.com/product/";
  return append.concat(link);
}

export function restorePhotoLink(link: string) {
  const append = "https://src.zakaz.atbmarket.com/";
  return append.concat(link);
}
