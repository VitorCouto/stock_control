import { ICategoryProps } from "./ICategoryProps";

export interface ICategoryContextProps {
  listCategory: ICategoryProps[];
  createCategory: (category: ICategoryProps) => Promise<void>;
  updateCategory: (id: string, category: ICategoryProps) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  error: string | null;
}
