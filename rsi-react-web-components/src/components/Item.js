import React from "react";

const Item = ({ caption, value }) => {
  return (
    <div>
      <label>{caption}</label>
      <label>{value}</label>
    </div>
  );
};

export default Item;
