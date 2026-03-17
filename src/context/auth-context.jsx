import { createContext } from 'react';

export default createContext({
  token: null,
  userId: null,
  email: null,
  login: (_token, _userId, _tokenExpiration, _email) => { /* Mocked login */ },
  logout: () => { /* Mocked logout */ },
});
