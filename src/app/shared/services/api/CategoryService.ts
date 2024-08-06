import { ICategoryProps } from "../../interface/ICategoryProps";
import { Api } from "../ApiConfig";
import { ApiExceptions } from "../ApiExceptions";

const getAll = async (): Promise<ICategoryProps[] | ApiExceptions> => {
  try {
    const { data } = await Api().get("/category");
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao consultar os registros.");
  }
};

const getById = async (id: string): Promise<ICategoryProps | ApiExceptions> => {
  try {
    const { data } = await Api().get(`/category/${id}`);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao consultar o registro.");
  }
};

const create = async (dataToCreate: Omit<ICategoryProps, 'id'>): Promise<ICategoryProps | ApiExceptions> => {
  try {
    const { data } = await Api().post("/category", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao criar o registro.");
  }
};

const updateById = async (id: string, dataToUpdate: ICategoryProps): Promise<ICategoryProps | ApiExceptions> => {
  try {
    const { data } = await Api().put(`/category/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao atualizar o registro.");
  }
};

const deleteById = async (id: string): Promise<{ status: boolean } | ApiExceptions> => {
  try {
    await Api().delete(`/category/${id}`);
    return { status: true };
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao apagar o registro.");
  }
};

export const CategoryService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
