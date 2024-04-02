import { Box, Button, alpha, useTheme } from '@mui/material'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import React from 'react'
import { MRT_Localization_AR } from 'material-react-table/locales/ar';
import AddValidationButton from './AddValidationButton';

const DetailPanel = ({columns , data , input_id}) => {
    const theme = useTheme()
    const table = useMaterialReactTable({
        columns,
        data,
        enableBottomToolbar: false,
        enableTopToolbar: false,
        enableSorting: false,
        enableColumnActions: false,
        enableFilters: false,
        state: {
          density: "compact",
        },
        muiTableHeadRowProps: {
          sx: {
            backgroundColor: theme.palette.darkBlue[100],
            // color: "white",
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
        // muiTableBodyProps : {
        //     sx : (theme) => ({
        //         backgroundColor : theme.palette.common.white
        //     })
        // },
        
        muiTableBodyRowProps : {
            sx : (theme) => ({
                backgroundColor : theme.palette.common.white,
                "&:hover" : {
                    backgroundColor : alpha(theme.palette.common.white , 1),
                }
            })
        },
        muiTablePaperProps: {
          sx: {
            boxShadow: "none",
          },
        },

      });
  return (
    <Box>
        <AddValidationButton input_id={input_id} />
        <MaterialReactTable table={table} />
    </Box>
  )
}

export default DetailPanel