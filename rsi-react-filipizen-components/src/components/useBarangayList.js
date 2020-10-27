import React, { useState, useEffect } from "react";
import { Service } from "rsi-react-web-components";

const useBarangayList = (initialOrgCode) => {
  const [orgcode, setOrgcode] = useState(initialOrgCode);
  const [barangays, setBarangays] = useState([]);

  useEffect(() => {
    if (orgcode) {
      const bsvc = Service.lookup("CloudPartnerService", "partner");
      bsvc.getBarangayList({ orgcode }, (err, brgyList) => {
        if (err) throw err;
        setBarangays(brgyList);
      });
    }
  }, [orgcode]);

  return barangays;
}

export default useBarangayList
