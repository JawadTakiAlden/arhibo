import { FiberManualRecord } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { useTranslation } from "react-i18next";

const columns = ["Number", "Price"];
const columns_ar = ["عدد الاشخاص" , "السعر"];

const PackageCard = ({ packageInfo }) => {
  const [description, setDescription] = useState([]);
  const {t , i18n} = useTranslation()
  const theme = useTheme();
  useEffect(() => {
    const description = i18n.language === 'en' ? packageInfo.description : packageInfo.description_ar;
    const descriptionSliced = description
      .split("\n").filter(ele => ele)
    setDescription(descriptionSliced);
  }, [packageInfo]);
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
        {i18n.language === 'en' ? packageInfo.name : packageInfo.name_ar}
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
          {t('PackageCard.description')}
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
            {
            
            (i18n.language === 'en' ? columns : columns_ar).map((col, i) => {
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
                {t('PackageCard.people')}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  borderBottom : 'none'
                }}
              >
                {obj.price} {t('PackageCard.sr')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default PackageCard;
