import { Button, Stack, Typography, SvgIcon } from "@mui/material";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { useRouter } from "next/router";

import { ModalComponent } from "src/components/modal";
import { routes } from "src/constants/routes";

export const UnsavedFormModal = (props) => {
  const { handleClose } = props;

  const router = useRouter();

  return (
    <ModalComponent {...props} left="60%" width={500}>
      <Stack alignItems="center" spacing={3}>
        <SvgIcon
          sx={{
            width: 100,
            height: 100,
          }}
          color="warning"
        >
          <ExclamationCircleIcon />
        </SvgIcon>
        <Typography variant="h4">Are you sure?</Typography>
        <Typography variant="body1" textAlign="center">
          There are unsaved changes in the form. Confirming the action will discard the entered
          data.
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button size="large" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="warning"
            onClick={() => router.push(routes.listing)}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};
