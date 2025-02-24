import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  registerBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    border: "1px solid gray",
    borderRadius: "1rem",
    padding: "2rem",
    minHeight: "20rem",
    minWidth: "20rem",
    backgroundColor: "#FAFAFA",
  },
}));
