import { getLocalStorageUser } from "./storage";

export function getTokenHeaders() {
  const user = getLocalStorageUser();

  return {
    headers: { Authorization: `Bearer ${user?.token}` },
  };
}
