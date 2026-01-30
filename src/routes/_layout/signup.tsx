import { createFileRoute } from "@tanstack/react-router";
import SignUp from "../../features/auth/components/sign-up.components";

export const Route = createFileRoute("/_layout/signup")({
  component: SignUp,
});
