import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Container, Stack, Snackbar, Unstable_Grid2 as Grid } from "@mui/material";
import Head from "next/head";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ItemPicture } from "src/sections/item/item-picture";
import { ItemForm } from "src/sections/item/item-form";
import { Heading } from "src/components/heading";
import { useItem } from "src/hooks/use-item";
import { Alert } from "src/components/alert";
import { routes } from "src/constants/routes";
import { NotificationModal } from "src/modals/notification";

const Page = () => {
  const [fileURL, setFileURL] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

  const router = useRouter();
  const id = router.query.id;

  const { addItem, updateItem, findItemById } = useItem();

  const handleSubmit = (values, { setSubmitting }) => {
    const body = { ...values, price: parseFloat(values.price), img: fileURL || values?.img };
    if (!id && !fileURL) {
      setAlertOpen(true);
      setSubmitting(false);
    } else {
      setSubmitting(true);
      setIsLoading(true);
      setIsSubmittedSuccessfully(true);
      setNotificationModalOpen(true);
      setTimeout(() => {
        id ? updateItem(id, body) : addItem(body);
        setSubmitting(false);
        setIsLoading(false);
      }, 2000);
    }
  };

  const itemToBeEdited = useMemo(() => findItemById(id), [findItemById, id]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleModalClose = () => {
    setNotificationModalOpen(false);
    router.back();
  };

  useEffect(() => {
    itemToBeEdited?.isSold && router.replace(routes.listing);
  }, [itemToBeEdited, router]);

  return (
    <>
      <Head>
        <title>{id ? "Edit" : "Add"} Item</title>
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
            <Heading title={`${id ? "Edit" : "Add"} Item`} />
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <ItemPicture setFileURL={setFileURL} item={itemToBeEdited} />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <ItemForm
                  handleSubmit={handleSubmit}
                  item={itemToBeEdited}
                  isSubmittedSuccessfully={isSubmittedSuccessfully}
                />
              </Grid>
            </Grid>
          </Stack>
        </Container>
        <Alert
          open={alertOpen}
          handleClose={handleClose}
          severity="error"
          text="Please upload the picture!"
        />
      </Box>
      <NotificationModal
        open={notificationModalOpen}
        isLoading={isLoading}
        loadingText={`${id ? "Updating" : "Adding"} Item...`}
        loadedText={`Item ${id ? "Updated" : "Added"} Successfully`}
        loadedCaption={`The new item details has been ${id ? "updated" : "added"} in the database`}
        handleClose={handleModalClose}
      />
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
