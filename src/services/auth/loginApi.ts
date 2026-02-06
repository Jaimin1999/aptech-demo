import { axiosInstance } from "@/lib/axios";
import { tokenService } from "@/lib/authTokens";
import { useMutation } from "@tanstack/react-query";

interface LoginPayload {
  username: string;
  password: string;
}

export const login = async ({ username, password }: LoginPayload) => {
  const { data } = await axiosInstance.post("/auth/login", {
    username,
    password,
    expiresInMins: 1,
  });

  tokenService.setTokens(data.accessToken, data.refreshToken);
  return data;
};

export const logout = () => {
  tokenService.clearTokens();
};


export const useLogin = () => {
    return useMutation({
      mutationFn: login,
    });
  };