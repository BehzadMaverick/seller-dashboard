import { useMemo } from "react";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Box, SvgIcon, Backdrop, Modal, Fade } from "@mui/material";

export const ModalComponent = (props) => {
  const { open, item, handleClose, left, width, isLoading } = props;

  const calculatedOpen = useMemo(() => Boolean(item), [item]);

  return (
    <Modal
      open={open ?? calculatedOpen}
      onClose={!isLoading && handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open ?? calculatedOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left,
            transform: "translate(-50%, -50%)",
            width,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          {!isLoading &&
          <SvgIcon
            fontSize="small"
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleClose}
          >
            <XMarkIcon />
          </SvgIcon>}
          {props.children}
        </Box>
      </Fade>
    </Modal>
  );
};
