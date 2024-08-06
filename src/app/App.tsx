import styles from "./App.module.scss";

import { Outlet } from "react-router-dom";

export const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Outlet />
    </div>
  );
};
