import type { UsersResponse } from "@/pages/Dashboard/DashboardData";
import { useFetch } from "@/services";

interface UseUsersParams {
  limit: number;
  skip: number;
  search?: string;
}

export const useUsersPaginated = ({
  limit,
  skip,
  search,
}: UseUsersParams) => {
  const url = search
    ? `/users/search?q=${search}&limit=${limit}&skip=${skip}`
    : `/users?limit=${limit}&skip=${skip}`;

  return useFetch<UsersResponse>(
    ["users"],
    url
  );
};
