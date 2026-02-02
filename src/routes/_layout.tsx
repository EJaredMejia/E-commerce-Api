import { getCurrentUserQueryOptions } from "@/features/auth/queries/auth.queries";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import { getCartProductsUser } from "@/features/cart/server/cart.server";
import { getCategoriesQueryOptions } from "@/features/categories/queries/categories.queries";
import { getAllCategories } from "@/features/categories/server/categories.server";
import { Footer } from "@/features/layout/components/footer.components";
import { NavBar } from "@/features/layout/components/nav-bar.components";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const { queryClient } = context;
    queryClient.prefetchQuery(getCategoriesQueryOptions(getAllCategories));

    const user = await queryClient.ensureQueryData(
      getCurrentUserQueryOptions(),
    );

    if (user) {
      queryClient.prefetchQuery(
        getCartQueryOptions({
          queryFn: getCartProductsUser,
          userId: user.id,
        }),
      );
    }
  },
});

function RouteComponent() {
  return (
    <div className="grid min-h-svh grid-rows-[auto_auto_auto]">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
