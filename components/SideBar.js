import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logos/logo.png";
import { SideBarData } from "./SideBarData";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@mui/material";
import { InsertEmoticon } from "@mui/icons-material";

const useStyles = makeStyles({
  sidebarstyle: {
    padding: 15,
    background: "#3b4559",
    transition: "all 0.5s",
    color: "white",
    fontFamily: "Poppins !important",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    marginBottom: 20,
    cursor: "pointer",
  },
  sidebarlist: {
    height: "auto",
    padding: 0,
    width: "100%",
  },
  row: {
    width: "100%",
    height: "50px",
    listStyleType: "none",
    margin: "0%",
    display: "flex",
    flexDirection: "row",
    color: "white",
    fontSize: "13px",
    alignItems: "center",
    fontFamily: "Poppins",
    "& #icon": {
      flex: "20%",
      display: "grid",
      placeItems: "center",
    },
    "& #title": {
      flex: "80%",
    },
    "&:hover": {
      cursor: "pointer",
      color: "#34EC30 !important",
      fontSize: "14px",
    },
  },

  text: {
    marginLeft: "10px",
    padding: 0,
    width: "100%",
    color: "white",
    fontFamily: "Poppins",
    weight: "400",
    marginTop: "20px",
  },
});

const SideBar = () => {
  const router = useRouter();
  const classes = useStyles();
  let userdata = localStorage.getItem("userdata");
  let user = JSON.parse(userdata);

  return (
    <div className={classes.sidebarstyle}>
      <Box>
        <Link href={`/dashboard`}>
          <img
            src={logo}
            className={classes.image}
            width="180px"
            height="auto"
          />
        </Link>
        <h6>Client Dashboard</h6>
        {SideBarData.map((val, key) => {
          return (
            <Box key={key} className={classes.sidebarlist}>
              <Box
                className={classes.row}
                sx={
                  router.pathname.slice(0, val.link.length) === val.link
                    ? { color: "#34EC30" }
                    : { color: "#fff" }
                }
              >
                <div id="icon">
                  <Link href={val.link}>{val.icon}</Link>
                </div>
                <div id="title">
                  <Link href={val.link}>{val.title}</Link>
                </div>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          p: 2,
          background: "#272e3b",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <InsertEmoticon fontSize="medium" /> {user.username}
      </Box>
    </div>
  );
};

export default SideBar;
