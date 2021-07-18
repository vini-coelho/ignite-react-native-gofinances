import React, {
  createContext,
  useContext,
  ReactNode
} from "react";

import * as AuthSession from 'expo-auth-session';

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
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '123',
    name: 'Vinicius Coelho',
    email: 'vinicoelho@live.com'
  }

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = '942050736281-ucr5mkgn2fj1d8tr15mdbbsea7qq9ieo.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@vini-coelho/gofinances';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });

      console.log(response);
    } catch(err) {
      throw new Error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
