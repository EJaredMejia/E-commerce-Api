import { createFileRoute } from "@tanstack/react-router";
import Login from "../../features/auth/components/login.components";

interface Search {
  message?: string;
}
export const Route = createFileRoute("/_layout/login")({
  component: Login,
  validateSearch: (search): Search => {
    const message = search?.["message"] ?? "";

    if (!message) {
      return {};
    }

    return {
      message: String(message),
    };
  },
});
