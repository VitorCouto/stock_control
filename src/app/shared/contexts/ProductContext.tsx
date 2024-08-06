import React, { createContext, useEffect, useState } from "react";
import { ProductService } from "../services/api/ProductService";
import { ApiExceptions } from "../services";
import { IProductProps } from "../interface/IProductProps";
import { IProductContextProps } from "../interface/IProductContextProps";
import { IChildrenProviderProps } from "../interface/IChildrenProviderProps";
import { useAuth } from "../hooks";

export const ProductContext = createContext<IProductContextProps>(
  {} as IProductContextProps
);

export const ProductProvider: React.FC<IChildrenProviderProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [listProducts, setProducts] = useState<IProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await ProductService.getAll();
      if (res instanceof ApiExceptions) {
        setError(res.message);
      } else {
        setProducts(res);
      }
    } catch (e) {
      setError("Ocorreu um erro ao buscar os dados!");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const createProduct = async (product: IProductProps) => {
    product.id = (listProducts.length + 1).toString();
    const res = await ProductService.create(product);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchProducts();
    }
  };

  const updateProduct = async (id: string, product: IProductProps) => {
    const res = await ProductService.updateById(id, product);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchProducts();
    }
  };

  const deleteProduct = async (id: string) => {
    const res = await ProductService.deleteById(id);
    if (res instanceof ApiExceptions) {
      setError(res.message);
    } else {
      await fetchProducts();
    }
  };

  return (
    <ProductContext.Provider
      value={{
        listProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
