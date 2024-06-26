import { Add, DeleteOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  SvgIcon,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DeleteButton from "./components/DeleteButton";
import useGetPrihibted from "../../../api/Prihibited/useGetPrihibted";
import EditButton from "./components/EditButton";

const data = [
  {
    id: 1,
    prohibited_things:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used",
  },
];
const ProhibitedThings = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const pirhibted = useGetPrihibted()
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "name_ar",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "action",
        header: t("AllCoupons.action"),
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
    data : pirhibted?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    state: {
      density: "compact",
      isLoading : pirhibted.isLoading
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
  });
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
        <Button
          component={Link}
          to={"/dashboard/prohibited/create"}
          endIcon={<Add />}
          size="medium"
        >
          {t("add_new")}
        </Button>

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

export default ProhibitedThings;
