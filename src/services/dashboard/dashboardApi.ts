import { axiosInstance } from "@/lib/axios";
import { useQuery, type  UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";

  export const fetchData = async <T,>(endpoint: string): Promise<T> => {
    const { data } = await axiosInstance.get(endpoint);
    return data;
  };
  
  // Generic hook
  export const useFetch = <T,>(
    queryKey: string[],
    endpoint: string,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<T> => {
    return useQuery({
      queryKey,
      queryFn: () => fetchData<T>(endpoint),
      ...options,
    });
  };


