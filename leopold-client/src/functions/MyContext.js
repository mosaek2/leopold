import { createContext, useState } from "react";

export const ContextSystem = createContext();

export default function MyContext({ children }) {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === null ||
      localStorage.getItem("isLogin") === "false"
      ? false
      : true,
  );

  const value = {
    get: {
      isLogin: isLogin,
    },
    set: {
      isLogin: setIsLogin,
    },
  };

  return (
    <div className="MyContext">
      <ContextSystem.Provider value={value}>{children}</ContextSystem.Provider>
    </div>
  );
}
