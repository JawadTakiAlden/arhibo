import { Box, Button, InputAdornment, useTheme } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import Search from "../../../components/Search";
import { useTranslation } from "react-i18next";
import { Add, SearchOutlined } from "@mui/icons-material";
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import useGetNickName from "../../../api/NickName/useGetNickName";
const NickNames = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
    const nicknames = useGetNickName()
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: t("Featuers.name"),
        size: 150,
      },
      {
        accessorKey: 'nickname',
        header: t("Featuers.name"),
        size: 150,
      },
      {
        accessorKey: "action",
        header: t("Featuers.action"),
        Cell: ({ row }) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <EditButton row={row.original} />
              <DeleteButton row={row.original} />
            </Box>
          );
        },
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: nicknames?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    state: {
      density: "compact",
      isLoading: nicknames.isLoading,
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: theme.palette.darkBlue.main,
        color: "white",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: "white",
        py: 2,
        "& .MuiButtonBase-root": {
          color: "white",
        },
      },
    },

    muiTableBodyRowProps: {
      sx: {
        backgroundColor: "#f3f3f3",
        "&:last-child .MuiTableCell-root": {
          borderBottom: "none",
        },
      },
    },

    muiTableBodyCellProps: {
      sx: {
        borderBottom: "3px solid #d9d9d9",
      },
    },

    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiTableProps: {
      sx: {
        maxWidth: "100%",
      },
    },
  });

  if (nicknames.isLoading) {
    return "loading ...";
  }
  return (
    <Box
      sx={{
        maxWidth: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: "15px",
          mb: 2,
        }}
      >
        <AddButton />

        <Search
          placeholder={t("search")}
          color="success"
          endAdornment={
            <InputAdornment position="end">
              <SearchOutlined />
            </InputAdornment>
          }
        />
      </Box>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default NickNames;
