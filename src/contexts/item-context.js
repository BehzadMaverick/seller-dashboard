import { createContext, useState } from "react";
import { activeItemsData, soldItemsData } from "src/data/items";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [activeItems, setActiveItems] = useState(activeItemsData);
  const [soldItems, setSoldItems] = useState(soldItemsData);
  const [searchedItems, setSearchedItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isBidAcceptedOrRejected, setIsBidAcceptedOrRejected] = useState(false);
  const [lastItemId, setLastItemId] = useState(activeItemsData.length + soldItemsData.length);

  const addItem = (item) => {
    setActiveItems((oldItems) => [
      ...oldItems,
      {
        id: (lastItemId + 1).toString(),
        ...item,
      },
    ]);
    setLastItemId((oldItemId) => oldItemId + 1);
  };

  const deleteItem = (id) => {
    setActiveItems((oldItems) => oldItems.filter((oldItem) => oldItem.id !== id));
  };

  const updateItem = (id, item) => {
    setActiveItems((oldItems) => {
      const index = oldItems.findIndex((p) => p.id === item.id);
      oldItems[index] = { id: id, ...item };
      return oldItems;
    });
  };

  const findItemById = (id) => {
    const foundItem =
      activeItems.find((item) => item.id === id) || soldItems.find((item) => item.id === id);
    return foundItem || "not found";
  };

  const filterItemsByName = (searchedValue, isSold = false) => {
    isSold
      ? setSearchedItems(
          soldItems.filter((item) => item.name.toLowerCase().includes(searchedValue.toLowerCase()))
        )
      : setSearchedItems(
          activeItems.filter((item) =>
            item.name.toLowerCase().includes(searchedValue.toLowerCase())
          )
        );
  };

  const acceptBid = (itemID, bid) => {
    setActiveItems((oldItems) => {
      const index = oldItems.findIndex((p) => p.id === itemID);
      const item = oldItems[index];
      item.isSold = true;
      item.acceptedBid = bid;
      setSoldItems((oldSoldItems) => [...oldSoldItems, item]);
      oldItems.splice(index, 1);
      setIsBidAcceptedOrRejected((oldValue) => !oldValue);
      return oldItems;
    });
  };

  const rejectBid = (itemID, bid) => {
    setActiveItems((oldItems) => {
      const index = oldItems.findIndex((p) => p.id === itemID);
      const item = oldItems[index];
      item.rejectedBids = [...item.rejectedBids, bid];
      const bidIndex = item.activeBids.findIndex((b) => b.id === bid.id);
      item.activeBids.splice(bidIndex, 1);
      oldItems[index] = item;
      setIsBidAcceptedOrRejected((oldValue) => !oldValue);
      return oldItems;
    });
  };

  const getOverviewStats = () => {
    return {
      soldItemsCount: soldItems.length,
      totalRevenue: soldItems.reduce((acc, item) => acc + item.acceptedBid.amount, 0),
      activeItemsPercentage: (
        (activeItems.length / (activeItems.length + soldItems.length)) *
        100
      ).toFixed(1),
      totalActiveBids: activeItems.reduce((acc, item) => acc + item.activeBids.length, 0),
      totalRejectedBids: activeItems.reduce((acc, item) => acc + item.rejectedBids.length, 0),
    };
  };

  return (
    <ItemContext.Provider
      value={{
        activeItems,
        soldItems,
        isSearching,
        searchedItems,
        isBidAcceptedOrRejected,
        addItem,
        deleteItem,
        updateItem,
        findItemById,
        filterItemsByName,
        setIsSearching,
        acceptBid,
        rejectBid,
        getOverviewStats,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
