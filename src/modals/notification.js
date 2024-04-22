import { Stack, SvgIcon, Typography } from "@mui/material";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import { ModalComponent } from "src/components/modal";
import { Spinner } from "src/components/spinner";

export const NotificationModal = (props) => {
  const { isLoading, loadingText, loadedText, loadedCaption } = props;

  return (
    <ModalComponent
      {...props}
      left="60%"
      width={isLoading ? 400 : 500}
    >
      <Stack
        alignItems="center"
        spacing={3}
      >
        {isLoading && <Spinner />}
        {!isLoading &&
        <SvgIcon
          color="success"
          sx={{
            width: 100,
            height: 100,
          }}
        >
          <CheckCircleIcon />
        </SvgIcon>}
        <Stack
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h6">
            {isLoading ? loadingText: loadedText}
          </Typography>
          {!isLoading && (
            <Typography variant="body1">
              {loadedCaption}
            </Typography>
          )}
        </Stack>
      </Stack>
    </ModalComponent>
  );
};
