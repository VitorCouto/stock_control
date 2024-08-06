import { IButtonSubmitProps } from "../../interface/IButtonSubmitProps";
import styles from "./ButtonSubmit.module.scss";

export const ButtonSubmit: React.FC<IButtonSubmitProps> = ({
  type = "button",
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
