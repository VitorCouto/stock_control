import React, { createContext, useEffect, useState } from "react";
import { CategoryService } from "../services/api/CategoryService";
import { ApiExceptions } from "../services";
import { ICategoryProps } from "../interface/ICategoryProps";
import { ICategoryContextProps } from "../interface/ICategoryContextProps";
import { IChildrenProviderProps } from "../interface/IChildrenProviderProps";
import { useAuth } from "../hooks";

export const CategoryContext = createContext<ICategoryContextProps>(
  {} as ICategoryContextProps
);

export const CategoryProvider: React.FC<IChildrenProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [listCategory, setCategories] = useState<ICategoryProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.getAll();
      if (res instanceof ApiExceptions) {
        setError(res.message);
      } else if (
        Array.isArray(res) &&
        res.every(
          (item) => typeof item.id === "string" && typeof item.name === "string"
        )
      ) {
        setCategories(res);
      } else {
        setError("Ocorreu um erro ao buscar os dados!");
      }
    } catch (e) {
      setError("Ocorreu um erro ao buscar os dados!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]);

  const createCategory = async (category: ICategoryProps) => {
    category.id = (listCategory.length + 1).toString();
    const res = await CategoryService.create(category);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchCategories();
    }
  };

  const updateCategory = async (id: string, category: ICategoryProps) => {
    const res = await CategoryService.updateById(id, category);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchCategories();
    }
  };

  const deleteCategory = async (id: string) => {
    const res = await CategoryService.deleteById(id);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchCategories();
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        listCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        error,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
