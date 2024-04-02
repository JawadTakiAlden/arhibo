import { CircleOutlined, FiberManualRecord } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ColoredWord from "../../../../components/ColoredWord";

const columns = ["Number", "With QR", "Without QR"];

const PackageCard = ({ packageInfo }) => {
  const [description, setDescription] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    const description = packageInfo.description;
    const descriptionSliced = description
      .split(".")
      .map((ele) => ele.replace("\n", ""));
    setDescription(descriptionSliced);
  }, [packageInfo]);
  console.log(packageInfo);
  return (
    <Box
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: '0px 4px 30px 0px #0000001A'
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60px",
          backgroundColor: packageInfo.color,
          color: "white",
        }}
      >
        {packageInfo.name}
      </Typography>
      <Box
        sx={{
          p: 2,
        }}
      >
        <Typography
          sx={{
            py: 1,
            borderBottom: `2px solid ${theme.palette.success.dark}`,
            width: "fit-content",
            fontWeight: "600",
            color: "#000",
          }}
        >
          Description
        </Typography>
        <List
          sx={{
            listStyle: "circle",
          }}
        >
          {description.map((item, i) => (
            <ListItem key={i}>
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                }}
              >
                <FiberManualRecord
                  sx={{
                    fontSize: "10px",
                    color: "#000",
                  }}
                />
              </ListItemIcon>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#EBEBEB",
            }}
          >
            {columns.map((col, i) => {
              return (
                <TableCell
                  sx={{
                    backgroundColor: "transparent",
                    borderBottom: "none",
                    fontWeight: "700",
                  }}
                >
                  {col}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {packageInfo.packageDetails.map((obj) => (
            <TableRow key={obj.id}>
              <TableCell
                sx={{
                  fontWeight: "700",
                  borderBottom : 'none'
                }}
              >
                <ColoredWord color={theme.palette.success.main}>
                  {obj.number_of_invitees}
                </ColoredWord>{" "}
                people
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  borderBottom : 'none'
                }}
              >
                {obj.price_qr} SR
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  borderBottom : 'none'
                }}
              >
                {obj.price} SR
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PackageCard;
