import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import { Delete, Add, Search } from "@mui/icons-material";
import OrderForm from "../components/OrderForm";
import OrderGrid from "../components/OrderGrid";
import { IOrder } from "../interfaces/Orders";
import { axiosConfig, orderTypes } from "../constants/constants";

import axios from "axios";
import { queryOrders } from "../api/querydata";

const CrudBar = () => {
  const [open, setOpen] = useState(false);
  const [ordersData, setOrdersData] = useState<IOrder[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("");
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>("None");
  const [customerFilter, setCustomerFilter] = useState<string>("");
  const [editSelectedOrderId, setEditSelectedOrderId] = useState<string>("");

  useEffect(() => {
    async function ahhh() {
      setOrdersData(await queryOrders());
    }
    ahhh();
  }, []);

  const handleOrderTypeFilterChange = (event: SelectChangeEvent) => {
    setOrderTypeFilter(event.target.value);
  };

  const handleCustomerFilterChange = (event: any) => {
    setCustomerFilter(event.target.value);
  };

  function handleDeleteOrder() {
    //fix with promises
    selectedOrderIds.forEach((element) => {
      axios
        .delete(
          `https://localhost:5000/api/Order/deleteOrder/${element}`,
          axiosConfig
        )
        .then((response) => {
          setOrdersData(
            ordersData.filter((order) => {
              return order.orderId !== element;
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setSelectedOrderIds([]);
  }

  const handleSnip = (order: IOrder) => {
    order.type = orderTypes[parseInt(order.type)];
    order.createdDate = order.createdDate.split("T")[0];
    return order;
  };

  const handleCreate = (newOrder: IOrder) => {
    newOrder = handleSnip(newOrder);
    setOrdersData((current) => [...current, newOrder]);
  };

  const handleEdit = (editedOrder: IOrder) => {
    editedOrder = handleSnip(editedOrder);
    setOrdersData(
      ordersData.map((order) => {
        if (order.orderId === editedOrder.orderId) {
          return editedOrder;
        }
        return order;
      })
    );
  };

  const createClicked = () => {
    setOpen(true);
    setMode("Create");
  };
  const editClicked = (val: string) => {
    setEditSelectedOrderId(val);
    setOpen(true);
    setMode("Edit");
  };

  return (
    <div>
      <Grid container sx={{ mt: 1, gap: 1 }}>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            display: { xs: "flex", sm: "block" },
            flexDirection: { xs: "column", sm: "row" },
            padding: "16px",
            gap: "8px",
          }}
        >
          <TextField
            id="standard-name"
            placeholder="Customer Search"
            onChange={handleCustomerFilterChange}
            InputProps={{
              endAdornment: <Search />,
            }}
          />
          <Button
            sx={{ flexGrow: 1 }}
            color="success"
            onClick={createClicked}
            variant="outlined"
            startIcon={<Add />}
          >
            Create Order
          </Button>
          <Button
            onClick={handleDeleteOrder}
            variant="outlined"
            color="error"
            sx={{ flexGrow: 1 }}
            startIcon={<Delete />}
          >
            Delete Selected
          </Button>

          <Select
            id="grouped-select"
            value={orderTypeFilter}
            sx={{ flexGrow: 1 }}
            placeholder="Order Type"
            onChange={handleOrderTypeFilterChange}
          >
            <MenuItem value={"None"}>None</MenuItem>
            <MenuItem value={"Standard"}>Standard</MenuItem>
            <MenuItem value={"Sale"}>Sale</MenuItem>
            <MenuItem value={"Purchase"}>Purchase</MenuItem>
            <MenuItem value={"Transfer"}>Transfer</MenuItem>
            <MenuItem value={"Return"}>Return</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <OrderGrid
        edit={editClicked}
        data={ordersData.filter((o) => {
          let render = true;
          if (customerFilter) {
            render =
              o.customerName
                .toLowerCase()
                .substring(0, customerFilter.length) ===
              customerFilter.toLowerCase();
          }
          if (orderTypeFilter !== "None" && render) {
            render = o.type === orderTypeFilter;
          }
          return render;
        })}
        setSelectedOrders={setSelectedOrderIds}
      />
      <OrderForm
        editSelectedOrder={editSelectedOrderId}
        show={open}
        setShow={setOpen}
        onPress={mode === "Create" ? handleCreate : handleEdit}
        option={mode === "Create" ? "Add Order" : "Save Changes"}
        mode={mode}
      />
    </div>
  );
};

export default CrudBar;
