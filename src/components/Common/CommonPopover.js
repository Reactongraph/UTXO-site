import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/material";

export default function CommonPopover(props) {
  const { content, open, onClose, anchorEl } = props || "";

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box>{content}</Box>
    </Popover>
  );
}
