import { Box, SvgIcon, useTheme } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import DeleteButton from './components/DeleteButton';
import AddButton from './components/AddButton';
import useGetPackageDetaisl from '../../../../api/Packages/useGetPackageDetaisl';
import EditButton from './components/EditButton';

const PackageDetail = () => {
    const { t , i18n } = useTranslation();
    const theme = useTheme();
    const packageDetails = useGetPackageDetaisl()
    const columns = useMemo(
      () => [
        {
          accessorKey: 'number_of_invitees',
          header: t('PackageDaitals.number_of_invitees'),
          size: 150,
        },
        {
          accessorKey: 'price_reminder_per_person',
          header: t('PackageDaitals.price_reminder_per_person'),
          size: 150,
        },
        {
          accessorKey: 'price',
          header: t('PackageDaitals.price'),
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
    const table = useMaterialReactTable({
      columns,
      data : packageDetails?.data?.data || [],
      // enableBottomToolbar: false,
      enableTopToolbar: false,
      enableSorting: false,
      enableColumnActions: false,
      enableFilters: false,
      state: {
        density: "compact",
        isLoading : packageDetails.isLoading
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
        
        </Box>
        <MaterialReactTable table={table} />
      </Box>
    );
}

export default PackageDetail