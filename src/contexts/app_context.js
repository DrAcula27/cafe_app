import { useState, createContext } from "react";

export const AppContext = createContext();

// take in props to get access to the children
const AppContextProvider = ({ children }) => {
  // put state
  const [user, setUser] = useState(null);
  const [activeCat, setActiveCat] = useState("Sandwiches");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        activeCat,
        setActiveCat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
