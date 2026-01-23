import { createFileRoute } from "@tanstack/react-router";
import Login from "../features/auth/components/login.components";

export const Route = createFileRoute("/login")({
  component: Login,
});
