import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../component/Navbar";

export function HomeLayout() {
  return (
    <Box>
      <Navbar />
      <Outlet />
    </Box>
  );
}
