 import { buttonClasses, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Theme = () => {
  const { i18n } = useTranslation();

  const themes = createTheme({
    direction: i18n.language === "ar" ? "rtl" : "ltr",
    palette: {
      mode: "light",
      background: {
        // default: "#FFFFFF",
      },
      error: {
        main: "#FF4015",
        light: "#ff6644",
        dark: "#cc3311",
        contrastText: "#fff",
      },
      lighRed: {
        main: "#ED4C5C",
        dark: "#be3d4a",
        light: "#f1707d",
      },
      success: {
        main: "#4AB37E",
        light: "#6ec298",
        dark: "#3b8f65",
      },
      grey: {
        main: "#C9C9C9",
        dark: "#a1a1a1",
        light: "#d4d4d4",
      },
      darkBlue: {
        main: "#193746",
        dark: "#142c38",
        light: "#475f6b",
        contrastText: "#fff",
        100: "#9AAAB4",
      },
    },
    typography: {
      fontFamily: "Poppins",
      h6: {
        fontWeight: 500,
        color: "#222222",
        fontSize: "0.75rem",
      },
      h5: {
        fontSize: "0.875rem",
        color: "#222222",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1rem",
        color: "#222222",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.25rem",
        color: "#222222",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.5rem",
        color: "#222222",
        fontWeight: 700,
      },
      h1: {
        fontSize: "2.125rem",
        color: "#222222",
        fontWeight: 700,
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundColor : '#f3f3f3'
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            height: "50px",
            padding: "8px 12px 8px 18px",
          },
        },
        variants: [
          {
            props: { variant: "contained", color: "darkBlue" },
            style: {
              color: "white",
              [`&.${buttonClasses.disabled}`] : {
                backgroundColor : '#758790',
                color : 'white',
              }
            },
          },
          {
            props: { variant: "contained", color: "lighRed" },
            style: {
              color: "white",
            },
          },
          {
            props: { variant: "contained", color: "lighRed" , disabled : true },
            style: {
              backgroundColor : 'red'
            },
          },
          {
            props: { variant: "contained", color: "grey" },
            style: {
              color: "white",
            },
          },
          {
            props: { variant: "contained", color: "success" },
            style: {
              color: "white",
            },
          },
        ],
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: "lighRed", variant: "contained" },
            style: {
              color: "white",
              backgroundColor: "#ED4C5C",
              "&:hover": {
                backgroundColor: "#be3d4a",
              },
            },
          },
          {
            props: { color: "success", variant: "contained" },
            style: {
              color: "white",
              backgroundColor: "#4AB37E",
              "&:hover": {
                backgroundColor: "#3b8f65",
              },
            },
          },
        ],
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            "& .MuiPaper-root": {
              borderRadius: "10px",
            },
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: "#222",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& .MuiButton-root": {
              height: "40px",
            },
          },
        },
      },
    },
  });

  return themes;
};

export default Theme;
