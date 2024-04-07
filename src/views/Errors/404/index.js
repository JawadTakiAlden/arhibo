import { Box } from "@mui/material";
import React from "react";
import NotFoundImage from "../../../assets/images/404.jpeg";
import styles from "./404.module.css";
import { useNavigate } from "react-router";

const Page404 = ({ onNavigate = null}) => {
  const navigate = useNavigate();

  if(!onNavigate){
    onNavigate = () => {
        navigate('/dashboard/home')
    }
  }
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src={NotFoundImage}
        alt="404"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          objectFit: "fill",
          zIndex: "1",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          left: "0",
          top: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 10%  , rgba(0,0,0,0) 100%)",
          zIndex: "2",
        }}
      >
        <button
          onClick={() => {
            onNavigate();
          }}
          className={styles["glowing-btn"]}
        >
          <span className={styles["glowing-txt"]}>
            G<span className={styles["faulty-letter"]}>O</span> BACK
          </span>
        </button>
      </Box>
    </Box>
  );
};

export default Page404;
