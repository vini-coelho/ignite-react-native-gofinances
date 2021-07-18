import { useContext } from "hoist-non-react-statics/node_modules/@types/react";
import React, { createContext, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
}

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '123',
    name: 'Vinicius Coelho',
    email: 'vinicoelho@live.com'
  }

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
