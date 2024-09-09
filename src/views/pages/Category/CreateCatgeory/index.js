import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import FileInput from "../../../../components/FileInput";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { DownloadOutlined, CreateOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import useCreateCategory from "../../../../api/Category/useCreateCategory";
import useGetVarsOfNiceSentence from "../../../../api/Category/useGetVarsOfNiceSentence";

const CreateCatgeory = () => {
  const { t } = useTranslation();
  const createCategory = useCreateCategory();
  const handelCreate = (values) => {
    createCategory.mutate(values);
  };
  const varNames = useGetVarsOfNiceSentence("create");
  const templateMessageRef = useRef(null);

  if (varNames.isLoading) {
    return <Typography>Loading ...</Typography>;
  }
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
          onSubmit={handelCreate}
          validationSchema={yup.object({
            name_ar: yup.string().required(),
            name: yup.string().required(),
            description_ar: yup.string().required(),
            description: yup.string().required(),
            image: yup.mixed().required(),
            photo: yup.mixed().required(),
            whatsApp_template: yup.string().required(),
          })}
          initialValues={{
            name_ar: "",
            name: "",
            description_ar: "",
            description: "",
            image: "",
            whatsApp_template: "",
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
                values={values}
                arrtName="image"
                setFieldValue={setFieldValue}
                label={t("CategoryForms.icon_of_category")}
              />
              <FileInput
                handelBlur={handleBlur}
                values={values}
                arrtName="photo"
                setFieldValue={setFieldValue}
                label={t("CategoryForms.image_of_category")}
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
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
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
              </FormControl>
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
                            const lastChar = values.whatsapp_template.charAt(
                              values.whatsapp_template.trim().length - 1
                            );
                            if (lastChar === "{") {
                              setFieldValue(
                                "whatsapp_template",
                                values.whatsapp_template + varName + "}}"
                              );
                            } else {
                              setFieldValue(
                                "whatsapp_template",
                                values.whatsapp_template + ` {{${varName} }} `
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
                    setFieldValue("whatsApp_template", e.target.value);
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
              <LoadingButton
                color="darkBlue"
                fullWidth
                variant="contained"
                loading={createCategory.isPending}
                type="submit"
                startIcon={<CreateOutlined fontSize="medium" />}
              >
                {t("add")}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateCatgeory;
