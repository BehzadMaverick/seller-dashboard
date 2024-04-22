import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useItem } from "src/hooks/use-item";

const Page = () => {
  const { getOverviewStats } = useItem();

  const stats = getOverviewStats();

  const getPercentage = () => {
    const totalBids = stats.totalActiveBids + stats.totalRejectedBids;
    return [
      Math.round((stats.totalActiveBids / totalBids) * 100) || 0,
      Math.round((stats.totalRejectedBids / totalBids) * 100) || 0,
    ];
  };

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                difference={16}
                sx={{ height: "100%" }}
                value={`$${stats.totalRevenue}`}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={`${stats.soldItemsCount}`}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                difference={10}
                positive={false}
                sx={{ height: "100%" }}
                value={stats.totalActiveBids}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: "100%" }}
                value={stats.activeItemsPercentage}
              />
            </Grid>

            <Grid
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    name: "This week",
                    data: [18, 16, 5, 8, 3, 14, 14],
                  },
                  {
                    name: "Last week",
                    data: [12, 11, 4, 6, 2, 9, 9],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewTraffic
                chartSeries={getPercentage()}
                labels={["Active Bids", "Rejected Bids"]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
