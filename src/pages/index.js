import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  Stack,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { routes } from "src/constants/routes";

export const Page = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid
        container
        sx={{ flex: "1 1 auto" }}
      >
        <Grid
          xs={12}
          sx={{
            alignItems: "center",
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Stack
            alignItems="center"
            sx={{ p: 3 }}
          >
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Welcome to{" "}
              <Box
                component="a"
                sx={{ color: "#15B79E" }}
                target="_blank"
              >
                Seller Dashboard
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              The ultimate peer-to-peer marketplace for all your needs
            </Typography>
            <Link href={routes.overview}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#15B79E",
                  "&:hover": {
                    backgroundColor: "#15B79E",
                    opacity: 0.9,
                  },
                }}
              >
                Go to Seller Dashboard
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
