import { Stack, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export const Heading = ({ title, isBack = true }) => {
  const router = useRouter();

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h4">{title}</Typography>
      {isBack && <Button onClick={() => router.back()}>Back</Button>}
    </Stack>
  );
};
