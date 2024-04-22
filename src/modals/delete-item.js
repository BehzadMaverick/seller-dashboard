import { Button, Stack, Typography, SvgIcon } from "@mui/material";
import { useRouter } from "next/navigation";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";

import { ModalComponent } from "src/components/modal";
import { useItem } from "src/hooks/use-item";
import { routes } from "src/constants/routes";

export const DeleteItemModal = (props) => {
  const { open, item, handleClose } = props;

  const router = useRouter();

  const { deleteItem}  = useItem();

  const handleDelete = () => {
    deleteItem(item?.id);
    open ? router.replace(routes.listing) : handleClose();
  };

  return (
    <ModalComponent
      {...props}
      left="60%"
      width={500}
    >
      <Stack
        alignItems="center"
        spacing={3}
      >
        <SvgIcon
          sx={{
            width: 100,
            height: 100,
          }}
          color="error"
        >
          <XCircleIcon />
      </SvgIcon>
        <Typography variant="h4">Are you sure?</Typography>
        <Typography
          variant="body1"
          textAlign="center"
        >
          Confirming the action will delete the item <strong>{item?.name}</strong>. This action
          cannot be undone.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};
