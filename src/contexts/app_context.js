import { useState, createContext } from "react";

export const AppContext = createContext();

// take in props to get access to the children
const AppContextProvider = ({ children }) => {
  // put state
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
