import Link from "next/link";
import Image from "next/image";
import { Button, Box, Divider, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { routes } from "src/constants/routes";

export const ItemDetails = (props) => {
  const { item, isModal, setDeleteItemModalOpen } = props;

  return (
    <Grid container spacing={3}>
      <Grid xs={12} lg={6}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image
            src={item?.img || ""}
            alt={item?.name || ""}
            width={400}
            height={300}
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} lg={6}>
        <Stack spacing={3}>
          <Typography variant="h4">{item?.name}</Typography>
          <Box>
            <Typography color="primary" variant="h4">
              ${item?.price?.toFixed(2)}
            </Typography>
            <Typography variant="caption">
              Total {!item?.isSold && "Active"} Bids: {item?.activeBids?.length}
            </Typography>
          </Box>
          <Typography variant="body1">
            {isModal ? item?.description.substr(0, 200) : item?.description}
          </Typography>
          {(isModal || !item?.isSold) && <Divider />}
          {isModal ? (
            <Link href={routes.viewItem(item?.id)}>
              <Button variant="contained">View More</Button>
            </Link>
          ) : (
            !item?.isSold && (
              <Stack direction="row" spacing={2}>
                <Link href={routes.editItem(item?.id)}>
                  <Button variant="contained">Edit</Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteItemModalOpen(true)}
                >
                  Delete
                </Button>
              </Stack>
            )
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};
