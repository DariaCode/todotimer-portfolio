import { createContext } from 'react';

export interface AuthContextType {
  token: string | null;
  userId: string | null;
  email: string | null;
  login: (token: string, userId: string, tokenExpiration: number, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  email: null,
  login: (_token, _userId, _tokenExpiration, _email) => {
    /* No-op */
  },
  logout: () => {
    /* No-op */
  },
});

export default AuthContext;
