

// const ProhibitedThings = () => {
//   const { t, i18n } = useTranslation();
//   const theme = useTheme();
//   const pirhibted = useGetPrihibted();
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: (row) => (i18n.language === "en" ? row.name : row.name_ar),
//         header: "Name",
//         size: 150,
//       },
//       {
//         accessorKey: "action",
//         Cell: ({ row }) => {
//           return (
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//               }}
//             >
//               <EditButton row={row.original} />
//               <DeleteButton row={row.original} />
//             </Box>
//           );
//         },
//         size: 150,
//       },
//     ],
//     []
//   );

  // const table = useMaterialReactTable({
  //   columns,
  //   data:  [],
  //   enableBottomToolbar: false,
  //   enableTopToolbar: false,
  //   enableSorting: false,
  //   enableColumnActions: false,
  //   enableFilters: false,
  //   state: {
  //     density: "compact",
  //     isLoading: pirhibted.isLoading,
  //   },
  //   muiTableHeadRowProps: {
  //     sx: {
  //       backgroundColor: theme.palette.darkBlue.main,
  //       color: "white",
  //     },
  //   },
  //   muiTableHeadCellProps: {
  //     sx: {
  //       color: "white",
  //       py: 2,
  //       "& .MuiButtonBase-root": {
  //         color: "white",
  //       },
  //     },
  //   },

  //   muiTableBodyRowProps: {
  //     sx: {
  //       backgroundColor: "#f3f3f3",
  //       "&:last-child .MuiTableCell-root": {
  //         borderBottom: "none",
  //       },
  //     },
  //   },

  //   muiTableBodyCellProps: {
  //     sx: {
  //       borderBottom: "3px solid #d9d9d9",
  //     },
  //   },

  //   muiTablePaperProps: {
  //     sx: {
  //       boxShadow: "none",
  //     },
  //   },
  // });
//   return (
//     <Box
//       sx={{
//         maxWidth: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           flexWrap: "wrap",
//           gap: "15px",
//           mb: 2,
//         }}
//       >
//         <Button
//           component={Link}
//           to={"/dashboard/prohibited/create"}
//           endIcon={<Add />}
//           size="medium"
//         >
//           {t("add_new")}
//         </Button>

//         <Search
//           placeholder={t("search")}
//           color="success"
//           endAdornment={
//             <InputAdornment position="end">
//               <SearchOutlined />
//             </InputAdornment>
//           }
//         />
//       </Box>
//       <MaterialReactTable table={table} />
//     </Box>
//   );
// };

// export default ProhibitedThings;

import { Box, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import useGetPrihibted from "../../../api/Prihibited/useGetPrihibted";
import EditButton from './components/EditButton'
import DeleteButton from './components/DeleteButton'
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

const ProhibitedThings = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const pirhibted = useGetPrihibted();

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => (i18n.language === "en" ? row.name : row.name_ar),
        header: "Name",
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
      data: pirhibted?.data?.data || [],
      enableBottomToolbar: false,
      enableTopToolbar: false,
      enableSorting: false,
      enableColumnActions: false,
      enableFilters: false,
      state: {
        density: "compact",
        isLoading: pirhibted.isLoading,
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

  return <Box>
    <MaterialReactTable table={table} />
  </Box>;
};

export default ProhibitedThings;
