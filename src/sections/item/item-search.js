import { useState } from "react";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

import { useItem } from "src/hooks/use-item";

export const ItemSearch = (props) => {
  const { isSold } = props;
  const [searchedItem, setSearchedItem] = useState();

  const { filterItemsByName, setIsSearching } = useItem();

  const handleSearch = (event) => {
    const value = event.target.value;
    setIsSearching(value.length > 0);
    setSearchedItem(value);
    filterItemsByName(value, isSold);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchedItem}
        onChange={handleSearch}
        fullWidth
        placeholder="Search item"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};
