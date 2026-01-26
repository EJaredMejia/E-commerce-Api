import { getLocalStorageUser } from "@/utils/storage";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  beforeLoad: () => {
    const user = getLocalStorageUser();

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
