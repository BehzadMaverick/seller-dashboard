import { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";

import { DeleteItemModal } from "src/modals/delete-item";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { ViewItemModal } from "src/modals/view-item";
import { getHighestBid } from "src/utils/get-highest-bid";
import { TABLE_HEADER_SOLD, TABLE_HEADER_ACTIVE } from "src/constants/table-header";
import { routes } from "src/constants/routes";

export const ItemsTable = (props) => {
  const {
    count = 0,
    items = [],
    isSold = false,
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const [viewItemModalOpen, setViewItemModalOpen] = useState(false);
  const [deleteItemDetails, setDeleteItemDetails] = useState(null);
  const [viewItemDetails, setViewItemDetails] = useState(null);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {isSold
                  ? TABLE_HEADER_SOLD.map((tableCell, index) => (
                      <TableCell
                        key={tableCell}
                        sx={{
                          textAlign: index === 0 && "left !important",
                        }}
                      >
                        {tableCell}
                      </TableCell>
                    ))
                  : TABLE_HEADER_ACTIVE.map((tableCell, index) => (
                      <TableCell
                        key={tableCell}
                        sx={{
                          textAlign: index === 0 && "left !important",
                        }}
                      >
                        {tableCell}
                      </TableCell>
                    ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((item, index) => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell padding="checkbox">{index + 1}.</TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Avatar src={item.img}>{getInitials(item.name)}</Avatar>
                          <Typography variant="subtitle2">{item.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {isSold
                          ? `$${item.acceptedBid.amount.toFixed(2)}`
                          : getHighestBid(item.activeBids)}
                      </TableCell>
                      <TableCell>
                        {isSold
                          ? item.activeBids.length + item.rejectedBids.length
                          : item.activeBids.length}
                      </TableCell>
                      <TableCell>
                        <Stack justifyContent="center" direction="row">
                          <Tooltip title="View">
                            <IconButton
                              onClick={() => {
                                setViewItemDetails(item);
                                setViewItemModalOpen(true);
                              }}
                            >
                              <SvgIcon fontSize="small">
                                <EyeIcon />
                              </SvgIcon>
                            </IconButton>
                          </Tooltip>
                          {!isSold && (
                            <>
                              <Tooltip title="Edit">
                                <Link href={routes.editItem(item.id)}>
                                  <IconButton>
                                    <SvgIcon fontSize="small">
                                      <PencilSquareIcon />
                                    </SvgIcon>
                                  </IconButton>
                                </Link>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton onClick={() => setDeleteItemDetails(item)}>
                                  <SvgIcon fontSize="small">
                                    <TrashIcon />
                                  </SvgIcon>
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan="6">No Items Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <DeleteItemModal item={deleteItemDetails} handleClose={() => setDeleteItemDetails(null)} />
      <ViewItemModal
        item={viewItemDetails}
        open={viewItemModalOpen}
        handleClose={() => setViewItemModalOpen(false)}
      />
    </Card>
  );
};
