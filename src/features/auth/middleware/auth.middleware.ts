import { createMiddleware } from "@tanstack/react-start";
import { getCurrentUser } from "../server/auth.server";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await getCurrentUser();
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await next({ context: { user } });
  return response;
});
