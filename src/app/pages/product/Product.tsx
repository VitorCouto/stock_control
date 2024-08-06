import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Product.module.scss";

import { IProductProps } from "../../shared/interface/IProductProps";
import { ButtonLink, ProductForm, Message } from "../../shared/components";
import { useProduct, useCategory } from "../../shared/hooks";

export const Product: React.FC = () => {
  const { listProducts, deleteProduct, error } = useProduct();
  const { listCategory } = useCategory();
  const [titlePage, setTitlePage] = useState("Produtos");
  const [titleBtnSubmit, setTitleBtnSubmit] = useState("Cadastrar Produto");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    IProductProps | undefined
  >(undefined);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "info" | "success" | "warning" | "error" | "validation"
  >("info");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentItems = listProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(listProducts.length / itemsPerPage);

  const handleEdit = (product: IProductProps) => {
    setEditingProduct(product);
    setIsFormVisible(true);
    setTitlePage(`Editar Produto - ${product.name}`);
    setTitleBtnSubmit("Editar Produto");
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    if (error) {
      setFormMessage(error);
      setErrorType("error");
    } else {
      setFormMessage("Produto Deletado com sucesso!");
      setErrorType("success");
    }
  };

  const handleOnClick = () => {
    setIsFormVisible(!isFormVisible);
    setTitlePage(!isFormVisible ? "Cadastrar Novo Produto" : "Produtos");
    resetForm();
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const resetForm = () => {
    setEditingProduct(undefined);
    setTitleBtnSubmit("Cadastrar Produtos");
  };

  const formatCurrency = (value: any) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getCategoryName = (id: number) => {
    if (!id) return;
    return listCategory.find((elem) => elem.id === id.toString())?.name;
  };

  const handleDismiss = () => {
    setFormMessage(null);
  };

  return (
    <div className={styles.product}>
      <div className={styles.title}>
        <h1>{titlePage}</h1>
        <ButtonLink
          to=""
          text={isFormVisible ? "Cancelar" : "Novo Produto"}
          handleOnClick={handleOnClick}
        />
      </div>

      {isFormVisible ? (
        <ProductForm
          productEdit={editingProduct}
          btnText={titleBtnSubmit}
          onSubmit={() => {
            setIsFormVisible(false);
            setEditingProduct(undefined);
            setTitlePage(
              !isFormVisible ? "Cadastrar Novo Produto" : "Produtos"
            );
            setFormMessage(
              editingProduct
                ? "Categoria Atualizada com sucesso!"
                : "Categoria Cadastrada com sucesso!"
            );
            setErrorType("success");
          }}
          setError={setFormMessage}
        />
      ) : (
        <>
          {formMessage && (
            <Message
              message={formMessage}
              type={errorType}
              duration={3000}
              onDismiss={handleDismiss}
            />
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>QTD</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{getCategoryName(product.categoryId)}</td>
                  <td>{product.qtd}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próximo"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          />
        </>
      )}
    </div>
  );
};
