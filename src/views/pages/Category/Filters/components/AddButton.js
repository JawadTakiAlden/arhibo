import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DialogTransition from "../../../../../components/DialogTransation";
import { Formik } from "formik";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import useCreateFilter from "../../../../../api/Category/useCreateFilter";
import useGetVarsOfNiceSentence from "../../../../../api/Category/useGetVarsOfNiceSentence";
const AddButton = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const createFilter = useCreateFilter();
  const { catgeoryID } = useParams();
  const varNames = useGetVarsOfNiceSentence("create");
  const templateMessageRef = useRef(null);

  if (varNames.isLoading) {
    return <Typography>Loading ...</Typography>;
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="darkBlue"
        endIcon={<Add />}
        size="medium"
        onClick={handleClickOpen}
      >
        {t("add_new")}
      </Button>
      <Dialog
        open={open}
         scroll="paper"
        TransitionComponent={DialogTransition}
        onClose={handleClose}
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="success"
            sx={{
              mb: 3,
            }}
          >
            <Add />
          </IconButton>
          <DialogContentText
            sx={{
              maxWidth: "300px",
              mb: 2,
              fontWeight: "500",
              fontSize: "24px",
              letterSpacing: "3%",
            }}
          >
            {t("AddFilterInCategory.title")}
          </DialogContentText>
          <Formik
            initialValues={{
              name: "",
              name_ar: "",
              category_id: +catgeoryID,
              whatsApp_template : ""
            }}
            validationSchema={yup.object({
              name: yup.string().required(),
              name_ar: yup
                .string()

                .required(),
                whatsApp_template : yup.string().nullable()
            })}
            onSubmit={async (values) => {
              await createFilter.mutateAsync(values);
              handleClose();
            }}
          >
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>{t("FiltersForm.name_en")}</InputLabel>
                  <OutlinedInput
                    label={t("FiltersForm.name_en")}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                  />
                  {errors.name && touched.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>{t("FiltersForm.name_ar")}</InputLabel>
                  <OutlinedInput
                    label={t("FiltersForm.name_ar")}
                    name="name_ar"
                    value={values.name_ar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name_ar && touched.name_ar}
                  />
                  {errors.name_ar && touched.name_ar && (
                    <FormHelperText error>{errors.name_ar}</FormHelperText>
                  )}
                </FormControl>
                <Box>
                  <Typography>
                    to write nice senctence you can use some dynamic varible in
                    your message , these are the list of varible name that you
                    can use in you message , please make sure you write the var
                    name in the same spliting you see
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "20px",
                      my: 3,
                      backgroundColor: "grey.50",
                      p: 2,
                      borderRadius: "8px",
                    }}
                  >
                    {varNames?.data?.data?.map((varName, i) => {
                      return (
                        <Tooltip title="click to copy" key={i}>
                          <Typography
                            sx={{
                              p: 0.5,
                              backgroundColor: "grey.200",
                              borderRadius: "4px",
                              transition: "0.2s",
                              cursor: "pointer",
                              "&:hover": {
                                transform: "scale(1.02)",
                              },
                            }}
                            onClick={() => {
                              const lastChar = values.whatsApp_template.charAt(
                                values.whatsApp_template.trim().length - 1
                              );
                              if (lastChar === "{") {
                                setFieldValue(
                                  "whatsApp_template",
                                  values.whatsApp_template + varName + "}}"
                                );
                              } else {
                                setFieldValue(
                                  "whatsApp_template",
                                  values.whatsApp_template + ` {{${varName} }} `
                                );
                              }
                            }}
                          >
                            {varName}
                          </Typography>
                        </Tooltip>
                      );
                    })}
                  </Box>
                </Box>
                <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                  <InputLabel>whatsApp Template Message</InputLabel>
                  <OutlinedInput
                    ref={templateMessageRef}
                    label={"whatsApp Template Message"}
                    name="whatsApp_template"
                    multiline
                    minRows={3}
                    value={values.whatsApp_template}
                    onChange={(e) => {
                      let newValue = e.target.value;
                      if (
                        e.target.value.charAt(e.target.value.length - 1) ===
                          "{" &&
                        e.target.value.length > values.whatsApp_template.length
                      ) {
                        newValue += "{ ";
                        setFieldValue("whatsApp_template", newValue);
                        return;
                      }
                      if (
                        e.target.value.charAt(e.target.value.length - 1) ===
                          "}" &&
                        e.target.value.length > values.whatsApp_template.length
                      ) {
                        newValue += "} ";
                        setFieldValue("whatsApp_template", newValue);
                        return;
                      }
                      setFieldValue("whatsApp_template", e.target.value);
                    }}
                    onKeyDown={(e) => {
                      const arrayMessage = values.whatsApp_template.split(" ");
                      const lastWord = arrayMessage[arrayMessage.length - 1];
                      const prevLastWord =
                        arrayMessage[arrayMessage.length - 2];
                      if (e.key === "Tab") {
                        e.preventDefault();
                        const sug = varNames?.data?.data?.filter((item) => {
                          return item.startsWith(lastWord);
                        });

                        if (sug.length === 1) {
                          if (prevLastWord === "{{") {
                            const newVlaue = [
                              ...arrayMessage.splice(
                                0,
                                arrayMessage.length - 1
                              ),
                              ...sug,
                              " }} ",
                            ].join(" ");
                            setFieldValue("whatsApp_template", newVlaue);
                            return;
                          } else {
                            const newVlaue = [
                              ...arrayMessage.splice(
                                0,
                                arrayMessage.length - 1
                              ),
                              "{{",
                              ...sug,
                              " }} ",
                            ].join(" ");
                            setFieldValue("whatsApp_template", newVlaue);
                            return;
                          }
                        }
                      }
                    }}
                    onBlur={handleBlur}
                    error={
                      errors.whatsApp_template && touched.whatsApp_template
                    }
                  />
                  {errors.whatsApp_template && touched.whatsApp_template && (
                    <FormHelperText error>
                      {errors.whatsApp_template}
                    </FormHelperText>
                  )}
                </FormControl>
                <LoadingButton
                  loading={createFilter.isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  {t("add")}
                </LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddButton;
