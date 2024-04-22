import { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  SvgIcon,
  IconButton,
  Tooltip,
  Card,
  Divider,
  CardContent,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import NoSymbolIcon from "@heroicons/react/24/solid/NoSymbolIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import { AcceptRejectBidModal } from "src/modals/accept-bid";

export const Bid = (props) => {
  const { bid, isRejected, itemID, isSold, isAccepted, setAlertOpen } = props;

  const [acceptRejectBidModalOpen, setAcceptRejectBidModalOpen] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const handleOpenModal = (value) => {
    setIsReject(value);
    setAcceptRejectBidModalOpen(true);
  };

  return (
    <Grid xs={4}>
      <Card>
        <CardContent sx={{ pb: "0 !important", p: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={bid.user.avatar || "/assets/avatars/avatar-anika-visser.png"}
                sx={{
                  height: 60,
                  width: 60,
                }}
              />
              <Stack>
                <Typography variant="body1">{bid.user.name}</Typography>
                <Typography variant="caption">${bid.amount}</Typography>
              </Stack>
            </Stack>
            <Box sx={{ pb: 1, textAlign: "center" }}>
              {isRejected && (
                <Typography variant="overline" color="error">
                  Rejected
                </Typography>
              )}
              {isAccepted ? (
                <Typography variant="overline" color="secondary">
                  Accepted
                </Typography>
              ) : (
                isSold && <Typography variant="overline">Abandoned</Typography>
              )}
              {!isSold && !isRejected && (
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Tooltip title="Reject Bid">
                    <IconButton onClick={() => handleOpenModal(true)}>
                      <SvgIcon color="error">
                        <NoSymbolIcon />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Divider orientation="vertical" sx={{ height: 35 }} />
                  <Tooltip title="Accept Bid">
                    <IconButton onClick={() => handleOpenModal(false)}>
                      <SvgIcon color="success">
                        <CheckIcon />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <AcceptRejectBidModal
        open={acceptRejectBidModalOpen}
        bid={bid}
        isReject={isReject}
        itemID={itemID}
        handleClose={() => setAcceptRejectBidModalOpen(false)}
        setAlertOpen={setAlertOpen}
      />
    </Grid>
  );
};
