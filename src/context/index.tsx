import { createContext, useContext, useState } from "react";

export const Context = createContext<any>(null);

export function StateProvider({ children }: any) {
  const [tabledata, setTabledata] = useState();
  const [errordata, setErrordata] = useState([]);
  
  return (
    <Context.Provider
      value={{
        tabledata,
        setTabledata,  
        errordata,   
        setErrordata,    
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
