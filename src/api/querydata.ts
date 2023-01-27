import axios from "axios";
import { axiosConfig } from "../constants/constants";
import { IOrder } from "../interfaces/Orders";
import { orderTypes } from "../constants/constants";

export async function queryOrders() {
    const response =  await axios
      .get("https://localhost:5000/api/Order/getorders", axiosConfig)
      return response.data.map((element: IOrder) => ({
        ...element,
        createdDate : element.createdDate.split("T")[0],
        type: orderTypes[parseInt(element.type)]
      }));
  }
