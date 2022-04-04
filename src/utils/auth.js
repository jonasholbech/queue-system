export function canDelete(author) {
  if (author === localStorage.getItem("name")) {
    return true;
  }
  if (localStorage.getItem("admin")) {
    return true;
  }
  return false;
}
