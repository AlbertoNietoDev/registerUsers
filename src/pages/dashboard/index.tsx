import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
// import { auth } from "../../firebase";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Drawer } from "../../components/Drawer.tsx";

interface IMission {
  missionNumber: number;
  name: string;
  description: string;
  imageUrl: string;
}
function createData({ missionNumber, name, description, imageUrl }: IMission) {
  return { missionNumber, name, description, imageUrl };
}

const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: "b6d6f67d84174ce3ab6a940b643a1baa",
        "Content-Type": "application/json",
        "Accept-Language": "en",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "b6d6f67d84174ce3ab6a940b643a1baa",
      },
      params: {
        key: "value", // Parámetros de la URL
      },
    })
    .then((res) => res.data);

export const DashboardPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const idToken = await auth?.currentUser.getIdToken();
        const idToken = sessionStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/users", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        // const response = await fetch("http://localhost:3001/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const {
    data,
    error: Error2,
    isLoading,
  } = useSWR<any>(
    "https://www.haloapi.com/metadata/h5/metadata/campaign-missions",
    fetcher,
  );
  const [searchName, setSearchName] = useState("");

  const rows = data?.map(
    ({ missionNumber, name, description, imageUrl }: IMission) => {
      return createData({ missionNumber, name, description, imageUrl });
    },
  );

  const handleSearch = (e: any) => {};

  console.log("data::::", rows);

  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        gap: 4,
      }}
    >
      <Drawer />
      <Typography variant="h5" sx={{ color: "#fafafa" }}>
        Welcome to Halo 5 Missions Data!
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
          <TableContainer component={Paper} sx={{ borderRadius: "1rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <p>...Loading</p>
                ) : (
                  rows?.map((row: IMission) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/*                       <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell> */}
                      <TableCell>{row.missionNumber}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <img
                          src={row?.imageUrl}
                          alt="No image"
                          style={{ width: "6vw" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Stack>
  );
};
