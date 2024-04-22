export const getHighestBid = (bids) => {
  const amount = bids[0]?.amount.toFixed(2);
  return amount ? `$${amount}` : "N/A";
};
