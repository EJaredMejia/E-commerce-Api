import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import LoadingScreen from "../components/loading-screen";
import Footer from "../features/layout/components/footer.components";
import NavBar from "../features/layout/components/nav-bar.components";

import appCss from "@/App.css?url";
import { getCurrentUserQueryOptions } from "@/features/auth/queries/auth.queries";
import indexCss from "@/index.css?url";
import { useAppStore } from "@/store/app.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getCartQueryOptions } from "@/features/cart/queries/cart.queries";
import { useAppSession } from "@/features/auth/utils/auth.utils";
import { getCartProductsUser } from "@/features/cart/server/cart.server";
import { createServerOnlyFn } from "@tanstack/react-start";

const getUserId = createServerOnlyFn(async () => {
  const { data } = await useAppSession();
  return data.userId;
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "E-commerce App",
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "stylesheet", href: indexCss },
        {
          rel: "icon",
          href: "https://api.iconify.design/lucide/shopping-cart.svg",
        },
      ],
      scripts: [],
    }),
    component: RootComponent,
    loader: async ({ context }) => {
      const { queryClient } = context;
      const userPromise = queryClient.ensureQueryData(
        getCurrentUserQueryOptions(),
      );

      const userId = await getUserId();

      queryClient.prefetchQuery(
        getCartQueryOptions({
          queryFn: getCartProductsUser,
          userId,
        }),
      );

      await userPromise;
    },
  },
);

function RootComponent() {
  return (
    <RootDocument>
      <AppContent />
    </RootDocument>
  );
}

function AppContent() {
  const { queryClient } = Route.useRouteContext();

  const isLoading = useAppStore((state) => state.isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading && <LoadingScreen />}
      <div className="grid min-h-svh grid-rows-[auto_auto_auto]">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
