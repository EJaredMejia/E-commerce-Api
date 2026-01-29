import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "../server/auth.server";

export const getCurrentUserQueryOptions = () => {
  return queryOptions({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    // 1 hour - data is almost static should not change often
    staleTime: 1000 * 60 * 60,
  });
};
