import { Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Drawer: React.FC = () => {
  const auth = useSelector((state: any) => state.AuthReducer);
  console.log('AUTH: ', auth)
  return <Stack sx={{minHeight: '5rem', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', color: "#fafafa", width: '100%', p: 2}}>{auth?.items?.email}</Stack>;
};
