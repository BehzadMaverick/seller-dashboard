/* eslint-disable */
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { ItemValidationSchema } from "src/utils/item-validation-schema";
import { UnsavedFormModal } from "src/modals/unsaved-form";
import { routes } from "src/constants/routes";

export const ItemForm = (props) => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [unsavedChangesModalOpen, setUnsavedChangesModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
    activeBids: [],
    rejectedBids: [],
    isSold: false,
  });

  const { handleSubmit, item, isSubmittedSuccessfully } = props;

  const router = useRouter();

  useEffect(() => {
    setFormState((oldFormState) => ({
      ...oldFormState,
      ...item,
    }));
  }, [item]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty && !isSubmittedSuccessfully) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };
    if (isFormDirty) {
      const routeChangeStart = () => {
        if (!unsavedChangesModalOpen && isFormDirty && !isSubmittedSuccessfully) {
          setUnsavedChangesModalOpen(true);
          router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error.";
        }
      };
      router.events.on("routeChangeStart", routeChangeStart);
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        router.events.off("routeChangeStart", routeChangeStart);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [isFormDirty, unsavedChangesModalOpen, isSubmittedSuccessfully]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formState}
        validationSchema={ItemValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ dirty, errors, touched, isSubmitting }) => (
          <Form autoComplete="off">
            {setIsFormDirty(dirty)}
            <Card>
              <CardHeader title="Item Information" subheader="This information can be edited" />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <Field
                        fullWidth
                        as={TextField}
                        label="Item Name"
                        name="name"
                        error={touched.name && errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Field
                        fullWidth
                        as={TextField}
                        type="number"
                        label="Item Price"
                        name="price"
                        error={touched.price && errors.price}
                        helperText={touched.price && errors.price}
                        sx={{
                          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              display: "none",
                            },
                          "& input[type=number]": {
                            MozAppearance: "textfield",
                          },
                        }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        multiline
                        minRows="4"
                        label="Item Description"
                        name="description"
                        error={touched.description && errors.description}
                        helperText={touched.description && errors.description}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  onClick={() => router.push(routes.listing)}
                  variant="outlined"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
      <UnsavedFormModal
        open={unsavedChangesModalOpen}
        handleClose={() => setUnsavedChangesModalOpen(false)}
      />
    </>
  );
};
