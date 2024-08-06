import { IInputSelectProps } from "../../interface/IInputSelectProps";
import styles from "./InputSelect.module.scss";

export const InputSelect: React.FC<IInputSelectProps> = ({
  label,
  name,
  value,
  options,
  handleOnChange,
  required,
}) => {
  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor={name}>{label}</label>
        <select
          name={name}
          id={name}
          onChange={handleOnChange}
          required={required}
          value={value || ""}
        >
          <option>Selecione a Categoria</option>
          {options.map((option: any) => (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
