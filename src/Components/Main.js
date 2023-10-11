import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./Header.js";
import { Footer } from "./Footer";
import { ModifiedTableRow } from "./ModifiedTableRow.js";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox
} from "@mui/material";
import { config } from "../App";

export const Main = () => {
  const [searchquery, setSearchQuery] = useState("");
  const [userdatabase, setuserdatabase] = useState([]);
  const [editable, setEditable] = useState([]);
  const [page, setpage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [filterdatabase, setfilterdatabase] = useState([]);
  const rowsPerPage = 10;

  //Database Access Function
  const fecthdatabase = async () => {
    try {
      const api = await axios.get(`${config.endpoint}`);
      setuserdatabase(api.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fecthdatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Single Cell Delete Function
  const handleDeleteCell = (id) => {
    let duplicate = [...userdatabase];
    duplicate = duplicate.filter((item) => item.id !== id);
    setuserdatabase(duplicate);
    setpage(
      page < Math.ceil(duplicate.length / rowsPerPage)
        ? page
        : Math.ceil(duplicate.length / rowsPerPage)
    );
    if (searchquery !== "") {
      let duplicate = [...filterdatabase];
      duplicate = duplicate.filter((item) => item.id !== id);
      setfilterdatabase(duplicate);
      setpage(
        page < Math.ceil(duplicate.length / rowsPerPage)
          ? page
          : Math.ceil(duplicate.length / rowsPerPage)
      );
    }
  };

  //Single Cell Edit Function
  const isEditable = (id) => {
    return editable.findIndex((row) => row.id === id) !== -1;
  };

  const handleToggleCellEdit = (row) => {
    const duplicate = [...editable];
    duplicate.push(row);
    setEditable(duplicate);
  };

  //Function of activating Editable Mode
  const handleCellEditChange = (event, id) => {
    const name = event.target.name;
    const value = event.target.value;
    if (searchquery !== "") {
      let duplicate = [...filterdatabase];
      duplicate = duplicate.map((row) => {
        if (row.id === id) {
          return { ...row, [name]: value };
        } else {
          return row;
        }
      });
      setfilterdatabase(duplicate);
    }
    let duplicate = [...userdatabase];
    duplicate = duplicate.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      } else {
        return row;
      }
    });
    setuserdatabase(duplicate);
  };

  //Function for Accepting changes
  const handleDoneChanges = (id) => {
    let duplicate = [...editable];
    duplicate = duplicate.filter((item) => item.id !== id);
    setEditable(duplicate);
  };

  //Function for revertgin back changes
  const handleRevertChanges = (id) => {
    let duplicate = [...editable];
    let database = [...userdatabase];
    const [item] = duplicate.filter((item) => item.id === id);
    database = database.map((row) => {
      if (row.id === id) {
        return item;
      }
      return row;
    });
    duplicate = duplicate.filter((item) => item.id !== id);
    setuserdatabase(database);
    setEditable(duplicate);
  };

  //SelectAll Function
  const handleSelectAll = (event) => {
    if (event.target.checked && searchquery === "") {
      const duplicate = [...userdatabase];
      const newSelected = duplicate
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((item) => item.id);
      setSelected(newSelected);
    } else if (event.target.checked && searchquery !== "") {
      const duplicate = [...filterdatabase];
      const newSelected = duplicate
        .slice((page - 1) * rowsPerPage, page * rowsPerPage)
        .map((item) => item.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  //Checkbox Highlighting if selected or not
  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  };

  //SearchBar Function
  const handleSearch = (event) => {
    let query = event.target.value;
    setSearchQuery(query);
    console.log(query);
    if (event.target.value === "") {
      setfilterdatabase([]);
    } else {
      const duplicate = [...userdatabase];
      const tempdatabase = duplicate.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          item.role.toLowerCase().includes(query.toLowerCase())
      );
      setfilterdatabase(tempdatabase);
    }
  };

  //Selecting multiple cells and showing visibility
  const handleCellSelection = (id) => {
    const duplicate = [...selected];
    if (isSelected(id)) {
      const index = selected.indexOf(id);
      duplicate.splice(index, 1);
    } else {
      duplicate.push(id);
    }
    setSelected(duplicate);
  };

  //Deleting selected cells
  const handleDeleteSelectedCells = () => {
    let duplicate = [...userdatabase];
    duplicate = duplicate.filter((item) => {
      return !selected.includes(item.id);
    });
    setuserdatabase(duplicate);
    setpage(
      page < Math.ceil(duplicate.length / rowsPerPage)
        ? page
        : Math.ceil(duplicate.length / rowsPerPage)
    );
    if (searchquery !== "") {
      let duplicate = [...filterdatabase];
      duplicate = duplicate.filter((item) => {
        return !selected.includes(item.id);
      });
      setfilterdatabase(duplicate);
      setpage(
        page < Math.ceil(duplicate.length / rowsPerPage)
          ? page
          : Math.ceil(duplicate.length / rowsPerPage)
      );
    }
    setSelected([]);
  };

  // Page Number State Function
  const handlePageNumber = (event, value) => {
    setpage(value);
  };

  //Handle Pagination Length
  const handlePaginationLength = () => {
    return filterdatabase.length > 0 || searchquery !== ""
      ? Math.ceil(filterdatabase.length / rowsPerPage)
      : Math.ceil(userdatabase.length / rowsPerPage);
  };

  //Rendering output
  return (
    <>
      <Header handleSearch={handleSearch} />
      <TableContainer sx={{ width: "90%", margin: "auto" }}>
        <Table padding="none">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selected.length > 0 ? true : false}
                  onClick={handleSelectAll}
                  size="small"
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterdatabase.length > 0 || searchquery !== ""
              ? filterdatabase
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((item) => {
                    const isItemSelected = isSelected(item.id);
                    const isItemEditable = isEditable(item.id);
                    return (
                      <ModifiedTableRow
                        handleItemSelection={isItemSelected}
                        row={item}
                        handleEditableCondition={isItemEditable}
                        handleCellEditChange={handleCellEditChange}
                        handleCellSelection={handleCellSelection}
                        handleDoneChanges={handleDoneChanges}
                        handleRevertChanges={handleRevertChanges}
                        handleToggleCellEdit={handleToggleCellEdit}
                        handleDeleteCell={handleDeleteCell}
                      />
                    );
                  })
              : userdatabase
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((item) => {
                    const isItemSelected = isSelected(item.id);
                    const isItemEditable = isEditable(item.id);
                    return (
                      <ModifiedTableRow
                        handleItemSelection={isItemSelected}
                        row={item}
                        handleEditableCondition={isItemEditable}
                        handleCellEditChange={handleCellEditChange}
                        handleCellSelection={handleCellSelection}
                        handleDoneChanges={handleDoneChanges}
                        handleRevertChanges={handleRevertChanges}
                        handleToggleCellEdit={handleToggleCellEdit}
                        handleDeleteCell={handleDeleteCell}
                      />
                    );
                  })}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer
        handlePageChange={handlePageNumber}
        handlePaginationLength={handlePaginationLength()}
        handleSelection={handleDeleteSelectedCells}
      />
    </>
  );
};
