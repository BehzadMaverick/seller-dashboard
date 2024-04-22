/* eslint-disable */
import { useState, useMemo } from "react";
import { Card, Button, CardContent, Box, Stack, Typography, Avatar } from "@mui/material";
import { AcceptRejectBidModal } from "src/modals/accept-bid";
import { useItem } from "src/hooks/use-item";

export const ItemBidder = (props) => {
  const { item, setAlertOpen } = props;

  const { isBidAcceptedOrRejected } = useItem();

  const [acceptBidModalOpen, setAcceptBidModalOpen] = useState(false);

  const bid = useMemo(
    () => item?.acceptedBid || item?.activeBids?.[0],
    [isBidAcceptedOrRejected, item]
  );

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h6">{item?.isSold ? "Sold to" : "Highest Bidder"}</Typography>
          {bid ? (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                src={bid.user.avatar}
                sx={{
                  height: 80,
                  width: 80,
                }}
              />
              <Box>
                <Typography
                  gutterBottom
                  variant="h5"
                >
                  {bid.user.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  ${bid.amount}
                </Typography>
              </Box>
            </Stack>
          ) : (
            <Typography variant="subtitle2">No Active Bids on this item</Typography>
          )}
          {!item?.isSold && bid && (
            <Button
              variant="outlined"
              onClick={() => setAcceptBidModalOpen(true)}
            >
              Accept this Bid
            </Button>
          )}
        </Stack>
      </CardContent>
      <AcceptRejectBidModal
        open={acceptBidModalOpen}
        bid={bid}
        itemID={item?.id}
        setAlertOpen={setAlertOpen}
        handleClose={() => setAcceptBidModalOpen(false)}
      />
    </Card>
  );
};
