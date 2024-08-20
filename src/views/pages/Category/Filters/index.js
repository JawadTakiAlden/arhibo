import { useTheme } from '@emotion/react';
import { Box, InputAdornment } from '@mui/material';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton';
import useGetFiltersOfCategory from '../../../../api/Category/useGetFiltersOfCategory';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import AddButton from './components/AddButton';
import Search from '../../../../components/Search';
import { SearchOutlined } from '@mui/icons-material';
import { MRT_Localization_AR } from 'material-react-table/locales/ar';
import { MRT_Localization_EN } from 'material-react-table/locales/en';

const FiltersOfCategory = () => {
    const { t , i18n } = useTranslation();
    const filters = useGetFiltersOfCategory()
  const theme = useTheme();
  const columns = useMemo(
    () => [
      {
        accessorKey: i18n.language === 'ar' ? 'name_ar' : 'name',
        header: t('CategoryFilters.filter_name'),
        size: 150,
      },
      {
        accessorKey: "action",
        type : "actions",
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
    data : filters?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    localization : i18n.language === 'ar' ?  MRT_Localization_AR : MRT_Localization_EN,
    state: {
      density: "compact",
      isLoading : filters.isLoading
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
  )
}

export default FiltersOfCategory