import React from "react";
import { TableCell, Input } from "@mui/material";

export const ModifiedTableCell = ({
  id,
  value,
  isEditMode,
  name,
  handleChange
}) => {
  return (
    <TableCell>
      {isEditMode ? (
        <Input
          size="small"
          onChange={(event) => handleChange(event, id)}
          value={value}
          name={name}
        />
      ) : (
        value
      )}
    </TableCell>
  );
};
