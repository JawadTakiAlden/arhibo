import { Box, SvgIcon, useTheme } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import DeleteButton from './components/DeleteButton';
import AddButton from './components/AddButton';

const PackageDetail = () => {
    const { t , i18n } = useTranslation();
    const theme = useTheme();
    const columns = useMemo(
      () => [
        {
          accessorKey: 'number_of_invitees',
          header: 'Number OF People',
          size: 150,
        },
        {
          accessorKey: 'price',
          header: 'With QR',
          size: 150,
        },
        {
          accessorKey:  'price_qr',
          header: 'Without QR',
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
                {/* <EditButton row={row.original} /> */}
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
    //   data : inputsInfo?.data?.data || [],
    data : [],
      enableBottomToolbar: false,
      enableTopToolbar: false,
      enableSorting: false,
      enableColumnActions: false,
      enableFilters: false,
      state: {
        density: "compact",
        // isLoading : inputsInfo.isLoading
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