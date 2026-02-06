import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
