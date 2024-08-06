import { ButtonLink } from "../../shared/components";
import { useAuth, useCategory, useProduct } from "../../shared/hooks";
import styles from "./Dashboard.module.scss";
import logo from "../../shared/img/logo.png";

export const Dashboard: React.FC = () => {
  const { nameUser } = useAuth();
  const { listProducts } = useProduct();
  const { listCategory } = useCategory();

  return (
    <div className={styles.dashboard}>
      <section className={styles.home_container}>
        <div className={styles.welcome}>
          <img src={logo} alt="Controle de Estoque" />
          <div className={styles.titles}>
            <h1>Olá, {nameUser}!!!</h1>
            <p>
              Comece a gerenciar os seus Produtos e suas Categorias agora mesmo!
            </p>
            <ButtonLink to="/product" text="Gerenciar Meus Produtos" />
          </div>
        </div>

        <div>
          <div className={styles.box}>
            <h2>{listProducts.length}</h2>
            <h3>Produtos Cadastrados</h3>
          </div>
          <div className={styles.box}>
            <h2>{listCategory.length}</h2>
            <h3>Categorias Cadastrados</h3>
          </div>
        </div>
      </section>
    </div>
  );
};
