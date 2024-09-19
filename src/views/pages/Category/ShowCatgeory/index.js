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
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import testImage from "../../../../assets/images/category-card.png";
import DialogTransition from "../../../../components/DialogTransation";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import useShowCategory from "../../../../api/Category/useShowCategory";
import useUpdateCategory from "../../../../api/Category/useUpdateCategory";
import useDeleteCategory from "../../../../api/Category/useDeleteCategory";
import useGetVarsOfNiceSentence from "../../../../api/Category/useGetVarsOfNiceSentence";

const ShowCatgeory = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { catgeoryID } = useParams();
  const catgeoryInfo = useShowCategory();
  const updateCatgeory = useUpdateCategory();
  const deleteCatgeory = useDeleteCategory();
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

  if (catgeoryInfo.isLoading) {
    return t("Shared.loading");
  }

  const handelUpdate = (values) => {
    updateCatgeory.mutate(values);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "90%", md: "60%" },
        }}
      >
        <Formik
          onSubmit={handelUpdate}
          validationSchema={yup.object({
            name_ar: yup
              .string()

              .required(),
            name: yup
              .string()

              .required(),
            description_ar: yup
              .string()

              .required(),
            description: yup
              .string()

              .required(),
            image: yup.mixed().required(),
            nice_sentence : yup.string().required(),
            whatsapp_template : yup.string().required(),
          })}
          initialValues={{
            name_ar: catgeoryInfo?.data?.data?.name_ar,
            name: catgeoryInfo?.data?.data?.name,
            description_ar: catgeoryInfo?.data?.data?.description_ar,
            description: catgeoryInfo?.data?.data?.description,
            nice_sentence : catgeoryInfo?.data?.data?.nice_sentence,
            whatsApp_template : catgeoryInfo?.data?.data?.whatsApp_template,
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <FileInput
                handelBlur={handleBlur}
                initialImage={catgeoryInfo?.data?.data?.image}
                mode="update"
                image={testImage}
                values={values}
                setFieldValue={setFieldValue}
              />
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CategoryForms.name_ar")}</InputLabel>
                <OutlinedInput
                  label={t("CategoryForms.name_ar")}
                  name="name_ar"
                  onChange={handleChange}
                  value={values.name_ar}
                  onBlur={handleBlur}
                  error={errors.name_ar && touched.name_ar}
                />
                {errors.name_ar && touched.name_ar && (
                  <FormHelperText error>{errors.name_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CategoryForms.name_en")}</InputLabel>
                <OutlinedInput
                  label={t("CategoryForms.name_en")}
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
              {/* <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CategoryForms.description_ar")}</InputLabel>
                <OutlinedInput
                  label={t("CategoryForms.description_ar")}
                  name="description_ar"
                  value={values.description_ar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description_ar && touched.description_ar}
                />
                {errors.description_ar && touched.description_ar && (
                  <FormHelperText error>{errors.description_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("CategoryForms.description_en")}</InputLabel>
                <OutlinedInput
                  label={t("CategoryForms.description_en")}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.description && touched.description}
                />
                {errors.description && touched.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl> */}
              <Box>
                <Typography>
                  to write nice senctence you can use some dynamic varible in
                  your message , these are the list of varible name that you can
                  use in you message , please make sure you write the var name
                  in the same spliting you see
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
                <InputLabel>Whatsapp Template Message</InputLabel>
                <OutlinedInput
                  ref={templateMessageRef}
                  label={"Whatsapp Template Message"}
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
                    setFieldValue("whatsApp_template", 
                      e.target.value);
                  }}
                  onKeyDown={(e) => {
                    const arrayMessage = values.whatsApp_template.split(" ");
                    const lastWord = arrayMessage[arrayMessage.length - 1];
                    const prevLastWord = arrayMessage[arrayMessage.length - 2];
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const sug = varNames?.data?.data?.filter((item) => {
                        return item.startsWith(lastWord);
                      });

                      if (sug.length === 1) {
                        if (prevLastWord === "{{") {
                          const newVlaue = [
                            ...arrayMessage.splice(0, arrayMessage.length - 1),
                            ...sug,
                            " }} ",
                          ].join(" ");
                          setFieldValue("whatsApp_template", newVlaue);
                          return 
                        }else {
                          const newVlaue = [
                            ...arrayMessage.splice(0, arrayMessage.length - 1),
                            "{{",
                            ...sug,
                            " }} ",
                          ].join(" ");
                          setFieldValue("whatsApp_template", newVlaue);
                          return
                        }
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  error={errors.whatsApp_template && touched.whatsApp_template}
                />
                {errors.whatsApp_template && touched.whatsApp_template && (
                  <FormHelperText error>
                    {errors.whatsApp_template}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  mb: 1,
                }}
              >
                <LoadingButton
                  color="darkBlue"
                  variant="contained"
                  type="submit"
                  loading={updateCatgeory.isPending}
                  sx={{
                    flexBasis: "50%",
                  }}
                  onClick={() => {
                    updateCatgeory.mutate(values);
                  }}
                  startIcon={<EditOutlined fontSize="medium" />}
                >
                  {t("edit")}
                </LoadingButton>
                <Button
                  color="lighRed"
                  variant="contained"
                  onClick={handleClickOpen}
                  sx={{
                    flexBasis: "50%",
                  }}
                  startIcon={<DeleteOutlined fontSize="medium" />}
                >
                  {t("delete")}
                </Button>
              </Box>
              <Button
                component={Link}
                to={`/dashboard/categories/${catgeoryID}/inputs`}
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  mb: 1,
                }}
              >
                {t("ShowCategory.show_inputs")}
              </Button>
              <Button
                component={Link}
                to={`/dashboard/categories/${catgeoryID}/filters`}
                fullWidth
                variant="contained"
                color="success"
              >
                {t("ShowCategory.show_filters")}
              </Button>
            </form>
          )}
        </Formik>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={DialogTransition}
        keepMounted
         scroll="paper"
        onClose={handleClose}
      >
        <DialogContent>
          <IconButton
            variant="contained"
            color="lighRed"
            sx={{
              mb: 3,
            }}
          >
            <DeleteOutlined />
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
            {t("deleteTitle", { objectName: "Category" })}
          </DialogContentText>
          <DialogContentText sx={{ maxWidth: "300px" }}>
            {t("deleteWarning", { objectName: "category" })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="grey" variant="contained" onClick={handleClose}>
            {t("dialog_cancel")}
          </Button>
          <LoadingButton
            color="lighRed"
            variant="contained"
            onClick={() => {
              deleteCatgeory.mutate();
            }}
          >
            {t("dialog_delete")}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShowCatgeory;
