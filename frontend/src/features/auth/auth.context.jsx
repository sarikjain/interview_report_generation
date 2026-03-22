import { createContext, useState, useEffect } from "react";
import { getme } from "./auth.api";

export const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getandsetuser = async () => {
      try {
        const data = await getme();
        setuser(data.user);
      } catch (err) {
        setuser(null);
      } finally {
        setloading(false);
      }
    };

    getandsetuser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};