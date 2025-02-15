import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useSWR from "swr";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const DashboardPage: React.FC = () => {
  const [searchName, setSearchName] = useState("");

  const handleSearch = (e: any) => {

  };

  const { data, error, isLoading } = useSWR<any>(
    "https://pokeapi.co/api/v2/pokemon",
    fetcher,
  );

  console.log('data::::',data)

  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
    >
      <Typography variant="h5" sx={{ color: "#fafafa" }}>
        Welcome to Pokemon Data!
      </Typography>
      <Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#fafafa !important",
            borderRadius: "1rem 1rem 0 0",
            p: 3,
            gap: 3,
          }}
        >
          <TextField
            sx={{ width: "80%" }}
            label="Search by name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
          />
          <Button
            sx={{ width: "20%", minHeight: "1rem" }}
            onClick={handleSearch}
            variant="contained"
          >
            Search
          </Button>
        </Stack>
        <Box
          sx={{
            p: 3,
            backgroundColor: "#fafafa",
            borderRadius: "0 0 1rem 1rem",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Stack>
  );
};
