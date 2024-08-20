import { SearchOutlined } from "@mui/icons-material";
import { Box, InputAdornment, SvgIcon, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Search from "../../../../components/Search";
import DeleteButton from "./components/DeleteButton";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import DetailPanel from "./components/DetailPanel";
import AddButton from "./components/AddButton";
import EditButton from "./components/EditButton";
import DeleteValidationButton from "./components/DeleteValidationButton";
import EditValidationButton from "./components/EditValidationButton";
import useGetInputsOfCategory from "../../../../api/Category/useGetInputsOfCategory";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_AR } from "material-react-table/locales/ar";

const InputOfCategory = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const inputsInfo = useGetInputsOfCategory();
  const columns = useMemo(
    () => [
      {
        accessorKey: i18n.language === "ar" ? "input_name_ar" : "input_name",
        header: t('InputOfCategory.input_name'),
        size: 150,
      },
      {
        accessorKey: i18n.language === "ar" ? "placeholder_ar" : "placeholder",
        header: t('InputOfCategory.placeholder'),
        size: 150,
      },
      {
        accessorKey: "action",
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
  const subColumns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t('InputOfCategory.regex_code'),
        size: 150,
      },
      {
        accessorKey: i18n.language === "ar" ? "message_ar" : "message",
        header: t('InputOfCategory.message'),
        size: 150,
      },
      {
        accessorKey: "action",
        Cell: ({ row }) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <EditValidationButton row={row.original} />
              <DeleteValidationButton row={row.original} />
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
    data: inputsInfo?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    localization : i18n.language === 'ar' ?  MRT_Localization_AR : MRT_Localization_EN,
    state: {
      density: "compact",
      isLoading: inputsInfo.isLoading,
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

    icons: {
      ExpandMoreIcon: (props) => (
        <SvgIcon fontSize="small">
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.454182 3.10646L4.42188 7.05424C4.5636 7.19555 4.73195 7.30765 4.91727 7.38414C5.10259 7.46063 5.30125 7.5 5.50189 7.5C5.70252 7.5 5.90119 7.46063 6.08651 7.38414C6.27183 7.30765 6.44017 7.19555 6.5819 7.05424L10.5496 3.10646C11.5147 2.14618 10.8253 0.500001 9.46193 0.500001L1.52653 0.5C0.163115 0.5 -0.510933 2.14618 0.454182 3.10646Z"
              fill="#222222"
            />
          </svg>
        </SvgIcon>
      ),
    },
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? "rotate(-180deg)" : "rotate(0)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) => (
      <DetailPanel
        columns={subColumns}
        data={row.original.validate}
        input_id={row.original.id}
      />
    ),
  });

  return (
    <Box>
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

export default InputOfCategory;
