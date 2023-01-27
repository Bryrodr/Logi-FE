
import React from "react";

export const axiosConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export enum orderTypes {
  Standard = 0,
  Sale,
  Purchase,
  Transfer,
  Return,
}



export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;
