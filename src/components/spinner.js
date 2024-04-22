import { useTheme } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
  const theme = useTheme();

  return (
    <ClipLoader
      color={theme.palette.primary.main}
      loading={true}
      size={50}
    />
  );
};
