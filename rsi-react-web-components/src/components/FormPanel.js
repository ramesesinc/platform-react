import React from "react";
import { DataContext, useDataContext } from "./DataContext";
import Panel from "./Panel";

const FormPanel = ({ children, visibleWhen = true, handler, ...rest }) => {
  if (!visibleWhen) return null;

  const dataCtx = useDataContext({ ...rest, handler });
  return (
    <DataContext.Provider value={dataCtx}>
      <Panel {...rest}>
        {typeof children === "function" ? children(dataCtx) : children}
      </Panel>
    </DataContext.Provider>
  );
};

export default FormPanel;
