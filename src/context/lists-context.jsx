import { createContext } from 'react';

const ListsContext = createContext({
  listsOption: null,
  setListsOption: (_option) => { /* No-op */ },
});

export default ListsContext;
