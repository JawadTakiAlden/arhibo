import { Add, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  SvgIcon,
  Typography,
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
import DeleteButton from "./Components/DeleteButton.js";
import useGetCoupon from "../../../api/Coupon/useGetCoupon.js";

const AllCoupons = () => {
  const { t , i18n} = useTranslation();
  const theme = useTheme();
  const coupons = useGetCoupon();

  const columns = useMemo(
    () => [
      {
        accessorKey: "coupon_code",
        header: t("AllCoupons.coupon"),
        size: 150,
      },
      {
        accessorKey: "number",
        header: t("AllCoupons.max_number_of_used"),
        size: 150,
      },
      {
        accessorKey: "offer",
        header: t("AllCoupons.offer_discount"),
        size: 200,
      },
      {
        accessorKey: "expiry_date",
        header: t("AllCoupons.expiry_date"),
        size: 200,
      },
      {

        header: t("AllCoupons.category"),
        size: 150,
        Cell: ({ row }) => {
          return <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexWrap : 'wrap'
            }}
          >
            {row.original?.categories?.map((cat) => {
              return <Typography
                sx={{
                  borderRadius : '20px',
                  backgroundColor : '#ccc',
                  p : 0.5
                }}
              key={cat.id}>{i18n.language === 'ar' ? cat.name_ar : cat.name}</Typography>;
            })}
          </Box>;
        },
      },
      {
        header: t("AllCoupons.package"),
        size: 150,
        Cell: ({ row }) => {
          return <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              flexWrap : 'wrap'
            }}
          >
            {row.original?.packages?.map((pac) => {
              return <Typography
                sx={{
                  borderRadius : '20px',
                  backgroundColor : '#ccc',
                  p : 0.5
                }}
              key={pac.id}>{pac.name}</Typography>;
            })}
          </Box>;
        },
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
              <IconButton
                component={Link}
                to={`/dashboard/coupons/${row.original.id}`}
                sx={{ borderRadius: "8px" }}
                variant="contained"
                color="success"
              >
                <SvgIcon>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.1665 3.3335H3.33317C2.89114 3.3335 2.46722 3.50909 2.15466 3.82165C1.8421 4.13421 1.6665 4.55814 1.6665 5.00016V16.6668C1.6665 17.1089 1.8421 17.5328 2.15466 17.8453C2.46722 18.1579 2.89114 18.3335 3.33317 18.3335H14.9998C15.4419 18.3335 15.8658 18.1579 16.1783 17.8453C16.4909 17.5328 16.6665 17.1089 16.6665 16.6668V10.8335"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.4165 2.0832C15.748 1.75168 16.1977 1.56543 16.6665 1.56543C17.1353 1.56543 17.585 1.75168 17.9165 2.0832C18.248 2.41472 18.4343 2.86436 18.4343 3.3332C18.4343 3.80204 18.248 4.25168 17.9165 4.5832L9.99984 12.4999L6.6665 13.3332L7.49984 9.99986L15.4165 2.0832Z"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </SvgIcon>
              </IconButton>
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
    data: coupons?.data?.data || [],
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableSorting: false,
    enableColumnActions: false,
    enableFilters: false,
    state: {
      density: "compact",
      isLoading: coupons.isLoading,
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

  if (coupons.isLoading) {
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
        <Button
          component={Link}
          to={"/dashboard/coupons/create"}
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

export default AllCoupons;
