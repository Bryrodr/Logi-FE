import { DataGrid } from "@mui/x-data-grid";
import { IOrder } from "../interfaces/Orders";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface OrderFormProps {
  data: IOrder[];
  setSelectedOrders: React.Dispatch<React.SetStateAction<string[]>>;
  edit: (val: string) => void;
}

const OrderGrid = ({ data, setSelectedOrders, edit }: OrderFormProps) => {
  const isAdmin = localStorage.getItem("role") == "admin";
  const username = localStorage.getItem("username");
  const columnData = [
    { field: "orderId", headerName: "Order ID", width: 300 },
    { field: "createdDate", headerName: "Creation Date", width: 200 },
    { field: "createdByUsername", headerName: "Created By", width: 150 },
    { field: "type", headerName: "Order Type", width: 150 },
    { field: "customerName", headerName: "Customer", width: 150 },
    {
      field: "status",
      headerName: "",
      width: 150,
      renderCell: (params: any) => {
        if (!isAdmin && params.row.createdByUsername === username) {
          return (
            <IconButton
              onClick={() => {
                edit(params.id);
              }}
            >
              <EditIcon />
            </IconButton>
          );
        }
      },
    },
  ];
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.orderId}
        rows={data}
        columns={columnData}
        pageSize={10}
        checkboxSelection
        onSelectionModelChange={(itm) => {
          setSelectedOrders(itm as string[]);
        }}
      />
    </div>
  );
};

export default OrderGrid;
