import { useEffect, useState, useMemo } from "react";
import { Typography, Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { useApiClient } from "../api/ApiClientProvider";

export const DashboardPage = () => {
  const api = useApiClient();
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/users/userlist").then((res) => setRowData(res.data));
  }, []);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
    ],
    []
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>

      <Box
        // className="ag-theme-material"
        sx={{ height: 400, width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={5}
        />
      </Box>
    </>
  );
};
