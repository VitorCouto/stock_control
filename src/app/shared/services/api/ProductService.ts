import { IProductProps } from "../../interface/IProductProps";
import { Api } from "../ApiConfig";
import { ApiExceptions } from "../ApiExceptions";

const getAll = async (): Promise<IProductProps[] | ApiExceptions> => {
  try {
    const { data } = await Api().get("/products");
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao consultar os registros.");
  }
};

const getById = async (id: string): Promise<IProductProps | ApiExceptions> => {
  try {
    const { data } = await Api().get(`/products/${id}`);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao consultar o registro.");
  }
};

const create = async (dataToCreate: Omit<IProductProps, 'id'>): Promise<IProductProps | ApiExceptions> => {
  try {
    const { data } = await Api().post("/products", dataToCreate);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao criar o registro.");
  }
};

const updateById = async (id: string, dataToUpdate: IProductProps): Promise<IProductProps | ApiExceptions> => {
  try {
    const { data } = await Api().put(`/products/${id}`, dataToUpdate);
    return data;
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao atualizar o registro.");
  }
};

const deleteById = async (id: string): Promise<{ status: boolean } | ApiExceptions> => {
  try {
    await Api().delete(`/products/${id}`);
    return { status: true };
  } catch (error: any) {
    return new ApiExceptions(error.response?.data?.message || error.message || "Erro ao apagar o registro.");
  }
};

export const ProductService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};