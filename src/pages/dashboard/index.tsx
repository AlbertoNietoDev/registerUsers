import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Drawer } from "../../components/Drawer.tsx";
import { useStyles } from "./dashboardStyle.tsx";

interface IMission {
  missionNumber: number;
  name: string;
  description: string;
  imageUrl: string;
}

const filterList = [
  { value: "name", label: "By Name" },
  { value: "missionNumber", label: "By Mission number" },
  { value: "description", label: "By Description" },
];

const headerList = ["Number", "Name", "Description", "Image"];

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
  const localStyles = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("name");

  const { data, error, isLoading } = useSWR<any>(
    "https://www.haloapi.com/metadata/h5/metadata/campaign-missions",
    fetcher,
  );

  if (error) {
    alert(`Error: ${error}`);
  }

  const rows = data?.map(
    ({ missionNumber, name, description, imageUrl }: IMission) => {
      return createData({ missionNumber, name, description, imageUrl });
    },
  );

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handlefilterSelected = (event: any) => {
    setFilterType(event.target.value);
  };

  const filteredData = useMemo(() => {
    return rows?.filter((row: IMission) => {
      if (filterType === "missionNumber" && searchTerm !== "") {
        return row?.[filterType]?.toString() === searchTerm.toLowerCase();
      }
      if (searchTerm === "") {
        return row;
      }
      return row?.[filterType]
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());
    });
  }, [filterType, rows]);

  return (
    <Stack className={localStyles.mainContainer}>
      <Drawer />
      <Typography variant="h5" sx={{ color: "#fafafa" }}>
        Welcome to Halo 5 Missions Data!
      </Typography>
      <Stack className={localStyles.stackContainer}>
        <Stack className={localStyles.stackSearchFiled}>
          <TextField
            sx={{ width: "80%" }}
            label="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Stack>
        <Stack className={localStyles.filterContainer}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="name"
            >
              {filterList.map((filter: { value: string; label: string }) => (
                <FormControlLabel
                  key={filter?.value}
                  value={filter?.value}
                  control={<Radio />}
                  label={filter?.label}
                  onChange={handlefilterSelected}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
        <Box className={localStyles.tableBox}>
          <TableContainer
            component={Paper}
            className={localStyles.tableContainer}
          >
            <Table
              className={localStyles.tableComponent}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {headerList?.map((header) => (
                    <TableCell className={localStyles.headerTableCell}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading || !data ? (
                  <p>...Loading</p>
                ) : (
                  filteredData?.map((row: any) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.missionNumber}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <img
                          src={row?.imageUrl}
                          alt={row?.name}
                          className={localStyles.imageStyle}
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
