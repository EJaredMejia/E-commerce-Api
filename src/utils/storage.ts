export function getLocalStorageUser() {
  // TODO migrate to cookies
  if (typeof window === "undefined") {
    return null;
  }
  const user = localStorage?.getItem("user");
  return user ? JSON.parse(user) : null;
}
