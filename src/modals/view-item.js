import { ModalComponent } from "src/components/modal";
import { ItemDetails } from "src/sections/item/item-details";
import { useMediaQuery } from "@mui/material";

export const ViewItemModal = (props) => {
  const { item } = props;
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <ModalComponent
      {...props}
      left={lgDown ? "50%" : "58%"}
      width={lgDown ? 500 : 900}
    >
      <ItemDetails
        isModal
        item={item}
      />
    </ModalComponent>
  );
};
