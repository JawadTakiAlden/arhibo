import {
  Box,
  Button,
  FormControlLabel,
  InputAdornment,
  Switch,
  useTheme,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import Search from "../../../components/Search";
import { useTranslation } from "react-i18next";
import { Add, SearchOutlined } from "@mui/icons-material";
import useGetFeatuers from "../../../api/Featuers/useGetFeatuers";
import AddButton from "./components/AddButton";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import useUpdateFeatuer from "../../../api/Featuers/useUpdateFeatuer";

const Featuers = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const update = useUpdateFeatuer()
  const featuers = useGetFeatuers();
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => {
          return i18n.language === "ar" ? row.name_ar : row.name;
        },
        header: t("Featuers.name"),
        size: 150,
      },
      {
        accessorFn: (row) => {
          return i18n.language === "ar" ? row.description_ar : row.description;
        },
        header: t("Featuers.description"),
        size: 150,
      },
      {
        accessorKey: "price",
        header: t("Featuers.price"),
        size: 200,
      },
      {
        accessorKey: "type",
        header: t("Featuers.type"),
        size: 200,
      },
      {
        accessorKey: "qunatity",
        header: t("Featuers.qunatity"),
        size: 200,
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
              <Switch
                checked={row.original.is_active}
                onChange={() => {
                  update.mutate({
                    data : {
                      'is_active' : !row.original.is_active
                    },
                    featuerID : row.original.id
                  })
                }}
                disabled={update.isPending}
              />
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
    data: featuers?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    state: {
      density: "compact",
      isLoading: featuers.isLoading,
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

  if (featuers.isLoading) {
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

export default Featuers;
