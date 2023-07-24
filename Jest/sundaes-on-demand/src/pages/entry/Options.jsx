import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "./../../constants/index";
import { formatCurrency } from "../../utils";
import { useOrderDetail } from "../../contexts/orderDetail";

const Options = ({ optionType }) => {
  const { total } = useOrderDetail();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  // optionType : 'scoops' | 'toppings'
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/${optionType}`);
        setOptions(data);
      } catch (err) {
        setError(true);
      }
    })();
  }, [optionType]);

  if (error) return <AlertBanner />;

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1);

  const optionItems = options.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(total[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
