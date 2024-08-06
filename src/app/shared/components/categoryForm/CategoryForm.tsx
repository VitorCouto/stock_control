import { useState } from "react";
import styles from "./CategoryForm.module.scss";

import { ButtonSubmit } from "../buttonSubmit/ButtonSubmit";
import { InputText } from "../InputText/InputText";

import { Message } from "../message/Message";
import { ICategoryFormProps } from "../../interface/ICategoryFormProps";

import { useCategory } from "../../hooks";

export const CategoryForm: React.FC<ICategoryFormProps> = ({
  btnText,
  categoryEdit,
  onSubmit,
  setError,
}) => {
  const { updateCategory, createCategory, listCategory, error } = useCategory();
  const [localError, setLocalError] = useState<string | null>("");
  const [errorType, setErrorType] = useState<
    "info" | "success" | "warning" | "error" | "validation"
  >("info");
  const [name, setName] = useState(categoryEdit?.name || "");

  const handleSubmit = async () => {
    if (!name) {
      setLocalError("Preencha todos os campos!");
      setErrorType("error");
      return;
    }
    try {
      if (categoryEdit) {
        await updateCategory(categoryEdit.id, { ...categoryEdit, name });
      } else {
        await createCategory({
          id: (listCategory.length + 1).toString(),
          name,
        });
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
    <div className={styles.categoryForm}>
      {localError && (
        <Message
          message={localError}
          type={errorType}
          duration={3000}
          onDismiss={handleDismiss}
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <InputText
          label="Nome da Categoria:"
          placeholder="Informe o Nome"
          type="text"
          name="name"
          value={name}
          handleOnChange={(e: any) => setName(e.target.value)}
          required={true}
        />

        <ButtonSubmit type="button" onClick={handleSubmit}>
          {btnText}
        </ButtonSubmit>
      </form>
    </div>
  );
};
