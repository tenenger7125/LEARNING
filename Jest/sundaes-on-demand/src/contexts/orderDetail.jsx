import { createContext, useContext, useState } from "react";
import { PRICE_PER_ITEM } from "./../constants/index";

const initialOrderDetail = {
  scoops: {
    // Chocolate: 1
  },
  toppings: {
    // "Gummi Bears": 1
  },
};

const OrderDetailContext = createContext();

export const OrderDetailContextProvider = ({ children }) => {
  const [orderDetail, setOrderDetail] = useState(initialOrderDetail);

  const updateOrderDetail = (name, count, optionType) => {
    setOrderDetail((prev) => ({
      ...prev,
      [optionType]: {
        ...prev[optionType],
        [name]: count,
      },
    }));
  };

  const resetOrder = () => setOrderDetail(initialOrderDetail);

  const calculateOrderTotal = () => {
    const keys = Object.keys(initialOrderDetail);

    return keys.reduce((total, optionType) => {
      const countsArray = Object.values(orderDetail[optionType]);
      total[optionType] = countsArray.reduce((acc, cur) => acc + cur, 0) * PRICE_PER_ITEM[optionType];

      return total;
    }, {});
  };

  return (
    <OrderDetailContext.Provider value={{ orderDetail, total: calculateOrderTotal(), updateOrderDetail, resetOrder }}>
      {children}
    </OrderDetailContext.Provider>
  );
};

export const useOrderDetail = () => {
  const context = useContext(OrderDetailContext);

  if (!context) throw new Error("useOrderDetail must be clled from within an OrderDetailContextProvider");
  return context;
};
