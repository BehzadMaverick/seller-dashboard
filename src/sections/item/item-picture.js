import { useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";

export const ItemPicture = (props) => {
  const { setFileURL, item } = props;
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
        setFileURL(`/assets/items/${file.name}`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <Avatar
            variant="square"
            src={selectedFile || item?.img || "/assets/items/placeholder.png"}
            sx={{
              height: 357,
              width: "100%",
            }}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={handleButtonClick}
        >
          {selectedFile || item?.img ? "Edit" : "Upload"} picture
        </Button>
      </CardActions>
    </Card>
  );
};
