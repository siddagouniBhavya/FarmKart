import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading , setLoading]=useState(true)
  const [equipment,setEquipment]=useState([])

  return (
    <AuthContext.Provider value={{ user, setUser ,loading,setLoading,equipment,setEquipment}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
