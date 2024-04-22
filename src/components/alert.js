import { forwardRef } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export const Alert = ({ open, handleClose, severity, text }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <SnackAlert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {text}
    </SnackAlert>
  </Snackbar>
);

const SnackAlert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
