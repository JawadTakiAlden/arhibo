import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { EditOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import DeleteButton from "./components/DeleteButton";
import useUpdateFaq from "../../../../api/FAQ/useUpdateFaq";
const ShowFaq = () => {
  const { t } = useTranslation();
  const updateFaq = useUpdateFaq();
  const handelCreate = (values) => {
    updateFaq.mutate(values);
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
          onSubmit={handelCreate}
          validationSchema={yup.object({
            question_ar: yup
              .string()
              .max(255)
              .required(t("FaqForms.question_ar_val")),
            question: yup
              .string()
              .max(255)
              .required(t("FaqForms.question_en_val")),
            answer_ar: yup
              .string()
              .max(255)
              .required(t("FaqForms.answer_ar_val")),
            answer: yup.string().max(255).required(t("FaqForms.answer_en_val")),
          })}
          initialValues={{
            question_ar: "",
            question: "",
            answer_ar: "",
            answer: "",
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("FaqForms.question_ar")}</InputLabel>
                <OutlinedInput
                  label={t("FaqForms.question_ar")}
                  name="question_ar"
                  onChange={handleChange}
                  value={values.question_ar}
                  onBlur={handleBlur}
                  error={errors.question_ar && touched.question_ar}
                />
                {errors.question_ar && touched.question_ar && (
                  <FormHelperText error>{errors.question_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("FaqForms.question_en")}</InputLabel>
                <OutlinedInput
                  label={t("FaqForms.question_en")}
                  name="question"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.question && touched.question}
                />
                {errors.question && touched.question && (
                  <FormHelperText error>{errors.question}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("FaqForms.answer_ar")}</InputLabel>
                <OutlinedInput
                  label={t("FaqForms.answer_ar")}
                  name="answer_ar"
                  value={values.answer_ar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.answer_ar && touched.answer_ar}
                />
                {errors.answer_ar && touched.answer_ar && (
                  <FormHelperText error>{errors.answer_ar}</FormHelperText>
                )}
              </FormControl>
              <FormControl color="success" fullWidth sx={{ mb: 1 }}>
                <InputLabel>{t("FaqForms.answer_en")}</InputLabel>
                <OutlinedInput
                  label={t("FaqForms.answer_en")}
                  name="answer"
                  value={values.answer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.answer && touched.answer}
                />
                {errors.answer && touched.answer && (
                  <FormHelperText error>{errors.answer}</FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <LoadingButton
                  color="darkBlue"
                  variant="contained"
                  type="submit"
                  loading={updateFaq.isPending}
                  sx={{
                    flexBasis: "50%",
                  }}
                  startIcon={<EditOutlined fontSize="medium" />}
                >
                  {t("edit")}
                </LoadingButton>
                <DeleteButton />
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ShowFaq;
