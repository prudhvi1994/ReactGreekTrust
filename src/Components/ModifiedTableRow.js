import React from "react";
import { ModifiedTableCell } from "./ModifiedTableCell";
import { TableCell, TableRow, IconButton, Checkbox } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const ModifiedTableRow = ({
  handleItemSelection,
  row,
  handleEditableCondition,
  handleCellEditChange,
  handleCellSelection,
  handleDoneChanges,
  handleRevertChanges,
  handleDeleteCell,
  handleToggleCellEdit
}) => {
  return (
    <TableRow hover selected={handleItemSelection}>
      <TableCell>
        <Checkbox
          onClick={() => handleCellSelection(row.id)}
          checked={handleItemSelection}
          size="small"
        />
      </TableCell>
      <ModifiedTableCell
        id={row.id}
        value={row.name}
        handleChange={handleCellEditChange}
        isEditMode={handleEditableCondition}
        name="name"
      ></ModifiedTableCell>
      <ModifiedTableCell
        id={row.id}
        value={row.email}
        handleChange={handleCellEditChange}
        isEditMode={handleEditableCondition}
        name="email"
      ></ModifiedTableCell>
      <ModifiedTableCell
        id={row.id}
        value={row.role}
        handleChange={handleCellEditChange}
        isEditMode={handleEditableCondition}
        name="role"
      ></ModifiedTableCell>
      <TableCell>
        {handleEditableCondition ? (
          <>
            <IconButton
              sx={{ color: "#2a9d8f" }}
              onClick={() => handleDoneChanges(row.id)}
            >
              <DoneAllIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#e76f51" }}
              onClick={() => handleRevertChanges(row.id)}
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => handleToggleCellEdit(row)}>
              <DriveFileRenameOutlineIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#e76f51" }}
              onClick={() => handleDeleteCell(row.id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
