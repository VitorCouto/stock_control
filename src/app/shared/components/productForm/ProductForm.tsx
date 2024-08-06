import { useEffect, useState } from "react";
import styles from "./ProductForm.module.scss";

import { ButtonSubmit } from "../buttonSubmit/ButtonSubmit";
import { InputText } from "../InputText/InputText";
import { InputSelect } from "../inputSelect/InputSelect";

import { Message } from "../message/Message";
import { IProductProps } from "../../interface/IProductProps";
import { ICategoryProps } from "../../interface/ICategoryProps";
import { IProductFormProps } from "../../interface/IProductFormProps";
import { useCategory, useProduct } from "../../hooks";

export const ProductForm: React.FC<IProductFormProps> = ({
  btnText,
  productEdit,
  onSubmit,
  setError,
}) => {
  const { createProduct, updateProduct, error } = useProduct();
  const { listCategory } = useCategory();

  const [localError, setLocalError] = useState<string | null>("");
  const [errorType, setErrorType] = useState<
    "info" | "success" | "warning" | "error" | "validation"
  >("info");
  const [listCategorySort, setListCategory] = useState<ICategoryProps[]>([]);
  const [product, setProduct] = useState<IProductProps>(
    productEdit || {
      id: 0,
      name: "",
      description: "",
      price: 0,
      qtd: 0,
      categoryId: 0,
    }
  );

  useEffect(() => {
    const sortedCategories = listCategory.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    setListCategory(sortedCategories);
  }, [listCategory, listCategorySort]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "price" || name === "qtd" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    const updatedProduct: IProductProps = {
      ...product,
      price: Number(product.price),
      qtd: Number(product.qtd),
      categoryId: Number(product.categoryId),
    };

    if (!product.name) {
      setLocalError("Preencha todos os campos!");
      setErrorType("error");
      return;
    } else if (product.price < 0 || product.qtd < 0 || !product.categoryId) {
      setError("Valores inválidos!");
      setErrorType("error");
      return;
    }
    try {
      if (Number(product.id) === 0) {
        await createProduct(updatedProduct);
      } else {
        await updateProduct(product.id, updatedProduct);
      }
      if (!error) {
        onSubmit();
      } else {
        setLocalError(error);
        setError(error);
        setErrorType("error");
      }
    } catch (err: any) {
      setLocalError(err.message || "Ocorreu um erro ao salvar a categoria.");
      setError(err.message || "Ocorreu um erro ao salvar a categoria.");
      setErrorType("error");
    }
  };

  const handleDismiss = () => {
    setLocalError(null);
  };

  return (
    <div className={styles.productForm}>
      {error && <Message message={error} type={errorType} duration={3000} />}

      {localError && (
        <Message
          message={localError}
          type={errorType}
          duration={3000}
          onDismiss={handleDismiss}
        />
      )}

      <form>
        <InputText
          label="Nome do Produto:"
          placeholder="Informe o Nome"
          type="text"
          name="name"
          value={product.name}
          handleOnChange={handleChange}
          required={true}
        />

        <InputText
          label="Descrição:"
          placeholder="Informe a Descrição"
          type="text"
          name="description"
          value={product.description}
          handleOnChange={handleChange}
          required={true}
        />

        <InputText
          label="Preço:"
          placeholder="Informe o Preço"
          type="number"
          name="price"
          value={product.price}
          handleOnChange={handleChange}
          required={true}
        />

        <InputText
          label="Quantidade:"
          placeholder="Informe a Quantidade"
          type="number"
          name="qtd"
          value={product.qtd}
          handleOnChange={handleChange}
          required={true}
        />

        <InputSelect
          label="Categoria:"
          options={listCategory}
          required={true}
          handleOnChange={handleChange}
          name="categoryId"
          value={product.categoryId ? product.categoryId : ""}
        />

        <ButtonSubmit type="button" onClick={handleSubmit}>
          {btnText}
        </ButtonSubmit>
      </form>
    </div>
  );
};
