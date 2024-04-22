/* eslint-disable */
import { useEffect, useCallback, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography, Tabs, Tab } from "@mui/material";

import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { ItemsTable } from "src/sections/item/items-table";
import { ItemSearch } from "src/sections/item/item-search";
import { applyPagination } from "src/utils/apply-pagination";
import { useItem } from "src/hooks/use-item";
import { routes } from "src/constants/routes";

const useItemsPagination = (method, page, rowsPerPage) => {
  const { soldItems, activeItems, searchedItems, isSearching } = useItem();

  const getItems = () => {
    if (isSearching) return searchedItems;
    return method === "active" ? activeItems : soldItems;
  };

  return useMemo(() => {
    return applyPagination(getItems(), page, rowsPerPage);
  }, [method, soldItems, activeItems, page, rowsPerPage, isSearching, searchedItems]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [method, setMethod] = useState("active");

  const { soldItems, activeItems, searchedItems, isSearching } = useItem();
  const items = useItemsPagination(method, page, rowsPerPage);

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [isSearching]);

  return (
    <>
      <Head>
        <title>My Listing</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">My Listing</Typography>
                <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
                  <Tab label="Active Items" value="active" />
                  <Tab label="Sold Items" value="sold" />
                </Tabs>
              </Stack>
              <div>
                <Link href={routes.addItem}>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add Item
                  </Button>
                </Link>
              </div>
            </Stack>
            <ItemSearch isSold={method === "sold"} />
            {method === "active" && (
              <ItemsTable
                count={isSearching ? searchedItems.length : activeItems.length}
                items={items}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )}
            {method === "sold" && (
              <ItemsTable
                count={isSearching ? searchedItems.length : soldItems.length}
                items={items}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                isSold={true}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
