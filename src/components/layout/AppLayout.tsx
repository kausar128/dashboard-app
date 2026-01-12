import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { GlobalApiLoader } from "../loaders/GlobalApiLoader";
import { BreadcrumbsBar } from "./BreadcrumbsBar";
import { TopNavBar } from "./TopNavBar";

export const AppLayout = () => (
  <>
    <GlobalApiLoader />
    <TopNavBar />

    <Container sx={{ mt: 4 }}>
      <BreadcrumbsBar />
      <Outlet />
    </Container>
  </>
);
