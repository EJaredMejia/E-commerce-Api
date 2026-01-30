import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { createQueryClient } from "./features/tanstack-query/utils/tanstack-query.utils";

import { ErrorComponent } from "./features/layout/components/error-component";
import { NotFoundComponent } from "./features/layout/components/not-found-component";
import { PendingComponent } from "./features/layout/components/pending-component";

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient: createQueryClient(),
    },
    defaultPreload: "intent",
    defaultStaleTime: 5000,
    defaultPendingComponent: PendingComponent,
    defaultErrorComponent: ErrorComponent,
    defaultNotFoundComponent: NotFoundComponent,
    defaultViewTransition: {
      types({ hrefChanged }) {
        if (!hrefChanged) {
          return false;
        }

        return ["fade"];
      },
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
