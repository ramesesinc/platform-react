import React from "react";
import { Radio, Item, Panel } from "rsi-react-web-components";

const Gender = (props) => {
  return (
    <Panel row>
      <Radio caption="Gender" {...props}>
        <Item caption="Male" value="M"/>
        <Item caption="Female" value="F" />
      </Radio>
    </Panel>
  );
};

export default Gender;
