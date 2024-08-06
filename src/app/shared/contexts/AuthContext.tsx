import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiExceptions, UserService } from "../services";
import { IAuthContextProps } from "../interface/IAuthContextProps";
import { IChildrenProviderProps } from "../interface/IChildrenProviderProps";

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);

export const AuthProvider: React.FC<IChildrenProviderProps> = ({
  children,
}) => {
  const [nameUser, setNameUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = window.sessionStorage.getItem("userLogged");
    if (userLogged && JSON.parse(userLogged).isAuthenticated) {
      setNameUser(JSON.parse(userLogged).name);
      setIsAuthenticated(JSON.parse(userLogged).isAuthenticated);
      if (isAuthenticated) {
        navigate(
          window.location.pathname !== "/login" ? window.location.pathname : "/"
        );
      }
    }
    setLoading(false);
  }, [navigate, isAuthenticated]);

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<string | void> => {
    setError(null);
    const res = await UserService.getUserByEmail(email);
    if (res instanceof ApiExceptions) {
      const errorMessage = res.message;
      setError(errorMessage);
      return errorMessage;
    } else if (
      res instanceof Array &&
      res.length > 0 &&
      res[0].email === email &&
      res[0].password === password
    ) {
      window.sessionStorage.setItem(
        "userLogged",
        JSON.stringify({
          isAuthenticated: true,
          email: email,
          name: res[0].name,
        })
      );
      setIsAuthenticated(true);
      navigate("/");
    } else {
      const errorMessage = "E-mail ou senha incorretos/inexistente";
      setError(errorMessage);
      return errorMessage;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        nameUser,
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        error,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
