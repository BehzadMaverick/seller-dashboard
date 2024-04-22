import { useContext } from 'react';
import { ItemContext } from 'src/contexts/item-context';

export const useItem = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItem must be used within a ItemProvider");
  }

  return context;
};
