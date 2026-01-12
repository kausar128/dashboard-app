import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/dashboard": "Dashboard",
};

export const BreadcrumbsBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link component={RouterLink} to="/">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const last = index === pathnames.length - 1;

        return last ? (
          <Typography key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} to={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
