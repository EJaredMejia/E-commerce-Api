export function getLocalStorageUser() {
  const user = localstorage?.getItem("user");
  return user ? JSON.parse(user) : null;
}
