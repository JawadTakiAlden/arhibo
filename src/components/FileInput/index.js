import { CloudUploadOutlined } from "@mui/icons-material";
import { Box, Typography, alpha, styled, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import ColoredWord from "../ColoredWord";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileInput = ({
  handelBlur,
  setFieldValue,
  values,
  mode = "create",
  arrtName = 'image',
  initialImage,
  label
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  if(!['create' , 'update'].includes(mode)){
    throw new Error("unknown mode for FileInput Compoentn , excpected create or update")
  }
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFieldValue(arrtName, droppedFile);
  };
  return mode === "create" ? (
    <Box
      component={"label"}
      role={undefined}
      sx={{
        backgroundColor: grey[100],
        padding: "19px 42px 19px 42px",
        borderRadius: "12px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        textAlign: "center",
        mb: 1,
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <CloudUploadOutlined color="success" fontSize="large" />
      <Typography sx={{my : 1}}>
        {label}
      </Typography>
      <Typography>{t("FileInput.drop")}</Typography>
      <ColoredWord component color={theme.palette.success.main}>
        {t("FileInput.browse")}
      </ColoredWord>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(theme.palette.success.main, 0.11),
          py: 1,
          px: 3,
          mt: 1,
          borderRadius: "8px",
          border: `1px solid ${theme.palette.success.main}`,
        }}
      >
        <Typography>{t("FileInput.suported_types")}</Typography>
      </Box>
      {values[arrtName] && (
        <Typography sx={{ my: 1, textDecoration: "underline" }}>
          {values[arrtName]?.name}
        </Typography>
      )}
      <VisuallyHiddenInput
        type="file"
        name="image"
        accept="image/png,image/jpg,image/jpeg"
        onChange={(e) => {
          setFieldValue(arrtName, e.target.files[0]);
        }}
        onBlur={handelBlur}
      />
    </Box>
  ) : (
    <Box
      component={"label"}
      role={undefined}
      sx={{
        backgroundColor: grey[100],
        padding: "19px 42px 19px 42px",
        borderRadius: "12px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        textAlign: "center",
        maxHeight: "300px",
        minHeight: "300px",
        overflow : 'hidden',
        mb: 1,
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <img
        loading="lazy"
        src={values.image ? URL.createObjectURL(values[arrtName]) : initialImage}
        alt="update-file-input"
        style={{
          objectFit: "contain",
          maxHeight : '100%',
          maxWidth : '100%'
        }}
      />
      <VisuallyHiddenInput
        type="file"
        name="image"
        accept="image/png,image/jpg,image/jpeg"
        onChange={(e) => {
          setFieldValue({arrtName}, e.target.files[0]);
        }}
        onBlur={handelBlur}
      />
    </Box>
  );
};

export default FileInput;
