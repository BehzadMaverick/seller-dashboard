import { Button, Stack, Typography, SvgIcon } from "@mui/material";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import NoSymbolIcon from "@heroicons/react/24/solid/NoSymbolIcon";

import { ModalComponent } from "src/components/modal";
import { useItem } from "src/hooks/use-item";

export const AcceptRejectBidModal = (props) => {
  const { bid, handleClose, isReject, itemID, setAlertOpen } = props;

  const { acceptBid, rejectBid } = useItem();

  const handleBidAction = () => {
    isReject ? rejectBid(itemID, bid) : acceptBid(itemID, bid);
    setAlertOpen(true);
    handleClose();
  }

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
          color={isReject ? "error" : "success"}
        >
          {isReject ? <NoSymbolIcon /> : <CheckIcon />}
      </SvgIcon>
        <Typography variant="h4">Are you sure?</Typography>
        <Typography
          variant="body1"
          textAlign="center"
        >
          Confirming the action will <em>{isReject ? "reject" : "accept"}</em> the bid of <strong>${bid?.amount}</strong> by{" "}
          <strong>{bid?.user?.name}</strong>. This action cannot be undone.
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
            color={isReject ? "error" : "success"}
            onClick={handleBidAction}
          >
            {isReject ? "Reject" : "Accept"}
          </Button>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};
