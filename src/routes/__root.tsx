import { Outlet, createRootRoute } from "@tanstack/react-router";
import { HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import LoadingScreen from "../Components/LoadingScreen";
import { useAppSelector } from "../store";
import { Provider } from "react-redux";
import store from "../store";
import appCss from "@/index.css?url";

export const Route = createRootRoute({
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
      {
        rel: "icon",
        href: "https://api.iconify.design/lucide/shopping-cart.svg",
      },
    ],
    scripts: [
      {
        crossOrigin: "anonymous",
        src: "https://kit.fontawesome.com/3baa0ab914.js",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </RootDocument>
  );
}

function AppContent() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    <>
      {isLoading && <LoadingScreen />}
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </>
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
