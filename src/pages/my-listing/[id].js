import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { Card, CardContent, Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { Heading } from "src/components/heading";
import { useItem } from "src/hooks/use-item";
import { DeleteItemModal } from "src/modals/delete-item";
import { ItemDetails } from "src/sections/item/item-details";
import { ItemBidder } from "src/sections/item/item-bidder";
import { ItemBids } from "src/sections/item/item-bids";
import { Alert } from "src/components/alert";
import { routes } from "src/constants/routes";

const Page = () => {
  const router = useRouter();
  const { isBidAcceptedOrRejected, findItemById } = useItem();
  const id = router.query.id;
  const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  /* eslint-disable-next-line */
  const item = useMemo(() => findItemById(id), [isBidAcceptedOrRejected, findItemById, id]);

  useEffect(() => {
    id && item === "not found" && router.push(routes.listing);
  }, [id, item, router]);

  return (
    <>
      <Head>
        <title>Item Details</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Heading title="Item Details" />
            <Card>
              <CardContent>
                <ItemDetails item={item} setDeleteItemModalOpen={setDeleteItemModalOpen} />
              </CardContent>
            </Card>
            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <ItemBidder item={item} setAlertOpen={setAlertOpen} />
              </Grid>
              <Grid xs={12} md={8}>
                <ItemBids item={item} setAlertOpen={setAlertOpen} />
              </Grid>
            </Grid>
          </Stack>
        </Container>
        <DeleteItemModal
          item={item}
          open={deleteItemModalOpen}
          handleClose={() => setDeleteItemModalOpen(false)}
        />
        <Alert
          open={alertOpen}
          handleClose={() => setAlertOpen(false)}
          severity={item?.isSold ? "success" : "primary"}
          text={item?.isSold ? "Bid has been accepted" : "Bid has been rejected"}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
