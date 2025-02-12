import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  headerDrawer: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem 1rem 2rem",
    height: "10vh",
    transition: "background-color 0.3s ease",
    backdropFilter: "blur(1.0333px)",
  },
  bodyCustom: {
    zIndex: 100,
    width: "100%",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    minHeight: "90vh",
  },
  spanTitleSyle: {
    color: "rgb(50, 73, 245)",
  },
}));
