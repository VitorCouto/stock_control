import { IProductProps } from "./IProductProps";

export interface IProductContextProps {
  listProducts: IProductProps[];
  createProduct: (product: IProductProps) => Promise<void>;
  updateProduct: (id: string, product: IProductProps) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  error: string | null;
}
