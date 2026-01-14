import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import ApiStatusOverlay from "../loaders/ApiStatusOverlay";
import { BreadcrumbsBar } from "./BreadcrumbsBar";
import { TopNavBar } from "./TopNavBar";

export const AppLayout = () => (
  <>
    <ApiStatusOverlay />
    <TopNavBar />

    <Container sx={{ mt: 4 }}>
      <BreadcrumbsBar />
      <Outlet />
    </Container>
  </>
);
