import { IInputTexProps } from "../../interface/IInputTextProps";
import styles from "./InputText.module.scss";

export const InputText: React.FC<IInputTexProps> = ({
  type,
  label,
  name,
  placeholder,
  value,
  handleOnChange,
  required,
  disabled,
}) => {
  return (
    <div className={styles.formGroup}>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
