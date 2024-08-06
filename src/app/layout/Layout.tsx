import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import { NavBar } from "../shared/components";
import { ILayoutProps } from "../shared/interface/ILayoutProps";

export const Layout: React.FC<ILayoutProps> = ({ className }) => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={`${styles.main} ${className}`}>
        <Outlet />
      </main>
    </div>
  );
};
