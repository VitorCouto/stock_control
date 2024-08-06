import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Category.module.scss";

import { ICategoryProps } from "../../shared/interface/ICategoryProps";
import { CategoryForm, ButtonLink, Message } from "../../shared/components";
import { useCategory } from "../../shared/hooks";

export const Category: React.FC = () => {
  const [titlePage, setTitlePage] = useState("Categorias");
  const [titleBtnSubmit, setTitleBtnSubmit] = useState("Cadastrar Categoria");
  const { listCategory, deleteCategory, error } = useCategory();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    ICategoryProps | undefined
  >(undefined);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<
    "info" | "success" | "warning" | "error" | "validation"
  >("info");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentItems = listCategory.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(listCategory.length / itemsPerPage);

  const handleEdit = (category: ICategoryProps) => {
    setEditingCategory(category);
    setIsFormVisible(true);
    setTitlePage(!isFormVisible ? "Editar Categoria" : "Categorias");
    setTitleBtnSubmit("Editar Categoria");
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    if (error) {
      setFormMessage(error);
      setErrorType("error");
    } else {
      setFormMessage("Categoria Deletado com sucesso!");
      setErrorType("success");
    }
  };

  const handleOnClick = () => {
    setIsFormVisible(!isFormVisible);
    setTitlePage(!isFormVisible ? "Cadastrar Nova Categoria" : "Categorias");
    resetForm();
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const resetForm = () => {
    setEditingCategory(undefined);
    setTitleBtnSubmit("Cadastrar Categoria");
    setFormMessage(null);
  };

  const handleDismiss = () => {
    setFormMessage(null);
  };

  return (
    <div className={styles.category}>
      <div className={styles.title}>
        <h1>{titlePage}</h1>
        <ButtonLink
          to=""
          text={isFormVisible ? "Cancelar" : "Novo Categoria"}
          handleOnClick={handleOnClick}
        />
      </div>

      {isFormVisible ? (
        <CategoryForm
          categoryEdit={editingCategory}
          btnText={titleBtnSubmit}
          onSubmit={() => {
            setIsFormVisible(false);
            setEditingCategory(undefined);
            setTitlePage(
              !isFormVisible ? "Cadastrar Nova Categoria" : "Categorias"
            );
            setFormMessage(
              editingCategory
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
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button onClick={() => handleEdit(category)}>Editar</button>
                    <button onClick={() => handleDelete(category.id)}>
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
