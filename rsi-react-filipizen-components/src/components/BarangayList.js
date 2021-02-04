import React, { useContext } from "react";
import { Combobox } from "rsi-react-web-components";
import useBarangayList from "./useBarangayList";

const BarangayList = ({ orgcode, name, caption, barangays, ...rest }) => {
  const barangayList = barangays || useBarangayList(orgcode);
  return (
    <Combobox
      name={name}
      caption={caption}
      {...rest}
      items={barangayList}
      expr={(item) => item.name}
      renderValue={(item) => item.name}
    />
  );
};

export default BarangayList;
