import { useState } from "react";
import { Card, CardContent, Tabs, Tab, Unstable_Grid2 as Grid, Typography } from "@mui/material";
import { Bid } from "src/components/bid";

export const ItemBids = (props) => {
  const { item, setAlertOpen } = props;

  const [method, setMethod] = useState("active");

  const handleMethodChange = (_event, value) => setMethod(value);

  return (
    <Card>
      <CardContent>
        <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
          <Tab label="Active Bids" value="active" />
          <Tab label="Rejected Bids" value="rejected" />
        </Tabs>
        {method === "active" && (
          <Grid container spacing={2}>
            {item?.activeBids?.length > 0 ? (
              item?.activeBids?.map((bid) => (
                <Bid
                  bid={bid}
                  key={bid.id}
                  itemID={item?.id}
                  isSold={item?.isSold}
                  isAccepted={bid.id === item?.acceptedBid?.id}
                  setAlertOpen={setAlertOpen}
                />
              ))
            ) : (
              <Typography variant="subtitle2">No Active Bids on this item</Typography>
            )}
          </Grid>
        )}
        {method === "rejected" && (
          <Grid container spacing={2}>
            {item?.rejectedBids?.length > 0 ? (
              item?.rejectedBids?.map((bid) => <Bid isRejected bid={bid} key={bid.id} />)
            ) : (
              <Typography variant="subtitle2">No Rejected Bids on this item</Typography>
            )}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
