import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { axiosConfig, Setter } from "../constants/constants";
import { IOrder } from "../interfaces/Orders";

interface OrderFormProps {
  show: boolean;
  setShow: Setter<boolean>;
  onPress: (newOrder: IOrder) => void;
  option: string;
  mode: string;
  editSelectedOrder: string;
}

const OrderForm = ({
  show,
  setShow,
  onPress,
  option,
  mode,
  editSelectedOrder,
}: OrderFormProps) => {
  const [customerNameData, SetCustomerName] = useState<string>("");
  const [orderType, SetOrderType] = useState<string>("");

  async function handleAddOrder() {
    await axios
      .post(
        "https://localhost:5000/api/Order/addOrder",
        {
          createdByUsername: localStorage.getItem("username"),
          type: orderType,
          customerName: customerNameData,
        },
        axiosConfig
      )
      .then(function (response) {
        if (response.data) {
          onPress(response.data);
        }
        SetCustomerName("");
        SetOrderType("");
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  }

  async function handleEditOrder() {
    console.log(editSelectedOrder);
    await axios
      .put(
        `https://localhost:5000/api/Order/updateOrder/${editSelectedOrder}`,
        {
          orderId: editSelectedOrder,
          customerName: customerNameData,
          type: orderType,
        },
        axiosConfig
      )
      .then(function (response) {
        if (response.data) {
          onPress(response.data);
        }
        SetCustomerName("");
        SetOrderType("");
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
    handleClose();
  }

  function handleClose() {
    setShow(false);
  }

  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    SetOrderType(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Order Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="CustomerName"
            placeholder="John Doe"
            label="Customer Name"
            type="text"
            value={customerNameData}
            onChange={(e) => SetCustomerName(e.target.value)}
            fullWidth
          />
          <InputLabel id="demo-simple-select-helper-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={orderType}
            onChange={handleOrderTypeChange}
            fullWidth
          >
            <MenuItem value={0}>Standard</MenuItem>
            <MenuItem value={1}>Sale</MenuItem>
            <MenuItem value={2}>Purchase</MenuItem>
            <MenuItem value={3}>Transfer</MenuItem>
            <MenuItem value={4}>Return</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ position: "absolute", right: 0, top: 0, fontSize: "1.5rem" }}
            onClick={handleClose}
            color="primary"
          >
            X
          </Button>
          <Button
            onClick={mode === "Create" ? handleAddOrder : handleEditOrder}
            color="primary"
          >
            {option}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderForm;
