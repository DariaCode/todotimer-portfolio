import React from 'react';

export default React.createContext({
  token: null,
  userId: null,
  email: null,
  login: (_token, _userId, _tokenExpiration, _email) => { /* Mocked login */ },
  logout: () => { /* Mocked logout */ },
});
