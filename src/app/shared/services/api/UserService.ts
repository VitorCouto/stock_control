import { ILoginProps } from "../../interface/ILoginProps";
import { Api } from "../ApiConfig";
import { ApiExceptions } from "../ApiExceptions";

const getUserByEmail = async (email: string): Promise<ILoginProps | ApiExceptions> => {
  try {
    const { data } = await Api().get(`/users?email=${email}`);
    if (data[0]?.email && data[0]?.password) {
      return data;
    }
    return new ApiExceptions("Erro ao consultar usuário.");
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao consultar usuário.");
  }
};

export const UserService = {
  getUserByEmail
}