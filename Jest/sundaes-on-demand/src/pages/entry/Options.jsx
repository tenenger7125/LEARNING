import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

import ScoopOption from "./ScoopOption";

const Options = ({ optionType }) => {
  const [options, setOptions] = useState([]);
  // optionType : 'scoops' | 'toppings'
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/${optionType}`);
        setOptions(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : null;
  const optionItems = options.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
