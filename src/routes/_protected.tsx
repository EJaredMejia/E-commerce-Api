import { getCurrentUserQueryOptions } from "@/features/auth/queries/auth.queries";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(
      getCurrentUserQueryOptions(),
    );

    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          message: "you need to log in to see your cart shop",
        },
      });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
