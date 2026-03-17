import { createContext } from 'react';

export interface ListsContextType {
  listsOption: number | null;
  setListsOption: (option: number) => void;
}

const ListsContext = createContext<ListsContextType>({
  listsOption: null,
  setListsOption: (_option) => {
    /* No-op */
  },
});

export default ListsContext;
