import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: any) => ({
  headerTableCell: {
    fontWeight: 600,
  },
  imageStyle: {
    width: "6vw",
  },
  tableContainer: {
    borderRadius: "1rem",
    height: "45vh",
  },
  tableBox: {
    padding: "24px",
    backgroundColor: "#fafafa",
    borderRadius: "0 0 1rem 1rem",
    width: "100%",
  },
  tableComponent: {
    minWidth: "650px",
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa !important",
    padding: "0 36px 0 36px",
    width: "100%",
  },
  stackSearchFiled: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fafafa !important",
    borderRadius: "1rem 1rem 0 0",
    padding: "24px",
    gap: "24px",
    width: "100%",
  },
  stackContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    width: "80%",
  },
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.8)",
    gap: "36px",
  },
}));
