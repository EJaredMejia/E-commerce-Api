import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import Footer from "../features/layout/components/footer.components";
import LoadingScreen from "../components/loading-screen";
import NavBar from "../features/layout/components/nav-bar.components";

import indexCss from "@/index.css?url";
import appCss from "@/App.css?url";
import { useAppStore } from "@/store/app.store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <NavBar />
      <Outlet />
      <Footer />
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
