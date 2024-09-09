import {
  Button,
  Dialog,
  SvgIcon,
  DialogContent,
  DialogContentText,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import DialogTransition from "../../../../../components/DialogTransation";
import { useParams } from "react-router";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import useUpdateFilter from "../../../../../api/Category/useUpdateFilter";
import { useTranslation } from "react-i18next";
import useGetVarsOfNiceSentence from "../../../../../api/Category/useGetVarsOfNiceSentence";
const EditButton = ({ row }) => {
  const [open, setOpen] = useState(false);
  const { catgeoryID } = useParams();
  const { t } = useTranslation();
  const updateFilter = useUpdateFilter();
  const varNames = useGetVarsOfNiceSentence("edit" , catgeoryID);
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
      <IconButton
        onClick={handleClickOpen}
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
          <DialogContentText
            sx={{
              maxWidth: "300px",
              mb: 2,
              fontWeight: "500",
              fontSize: "24px",
              letterSpacing: "3%",
            }}
          >
            {t("EditCategoryFilters.title")}
          </DialogContentText>
          <Formik
            initialValues={{
              name: row.name,
              name_ar: row.name_ar,
              category_id: +catgeoryID,
              whatsApp_template: row.whatsApp_template,
            }}
            validationSchema={yup.object({
              name: yup.string().required(),
              name_ar: yup
                .string()
                .required(),
              whatsApp_template: yup.string().nullable(),
            })}
            onSubmit={async (values) => {
              await updateFilter.mutateAsync({
                data: values,
                filterID: row.id,
              });
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
              setFieldValue,
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
                  loading={updateFilter.isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                >
                  {t("edit")}
                </LoadingButton>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
