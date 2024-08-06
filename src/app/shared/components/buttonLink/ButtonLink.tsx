import { Link } from "react-router-dom";
import styles from "./ButtonLink.module.scss";
import { IButtonLink } from "../../interface/IButtonLinkProps";

export const ButtonLink: React.FC<IButtonLink> = ({
  to,
  text,
  handleOnClick,
}) => {
  return (
    <Link className={styles.button} to={to} onClick={handleOnClick}>
      {text}
    </Link>
  );
};
