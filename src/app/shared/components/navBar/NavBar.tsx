import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

import { useAuth } from "../../hooks";
import logo from "./../../img/logo.png";

export const NavBar: React.FC = () => {
  const auth = useAuth();

  return (
    <header className={styles.header}>
      <div className="logo">
        <Link to="/dashboard" className={styles.navLink}>
          <img src={logo} alt="Controle de Estoque" />
        </Link>
      </div>
      <div>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/product" className={styles.navLink}>
                Produtos
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/category" className={styles.navLink}>
                Categorias
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.logout}>
        <span onClick={auth.logout}>Sair</span>
      </div>
    </header>
  );
};
