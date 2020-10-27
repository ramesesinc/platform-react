import React from "react";
import _object from "lodash/object";
import produce from "immer";

export const DataContext = React.createContext();

export const useDataContext = ({ context = {}, handler, ...rest }) => {
  const handleChange = (evt, isBooleanValue = false) => {
    const isBoolean = typeof isBooleanValue === "boolean" ? isBooleanValue : false;
    const { name } = evt.target;
    let resolvedValue = isBoolean ? evt.target.checked : evt.target.value;
    const updatedValues = produce(context, draft => {
      _object.set(draft, name, resolvedValue)
    })
    handler(updatedValues);
  };

  return {
    context,
    handleChange,
    ...rest
  };
};

const getContextValue = (context, name, expr, defaultValue) => {
  if (expr && typeof expr === "function") {
    return expr(context);
  } else if (expr && typeof expr === "string") {
    return _object.get(context, `${expr}`) || defaultValue;
  }
  return _object.get(context, name) || defaultValue;
};

export const getFieldProps = (ctx, props) => {
  const name = props.id || props.name;
  const expr = props.expr;

  if (ctx) {
    const handleChange = props.onChange || ctx.handleChange;
    const { context } = ctx;
    const value = getContextValue(context, name, expr, "");
    return { value, onChange: handleChange };
  } else {
    const { context, onChange: handleChange } = props;
    const value = context
      ? getContextValue(context, name, expr)
      : props.value || "";

    return {
      value,
      onChange: (evt, isBooleanValue = false) => {
        let resolvedValue = isBooleanValue ? evt.target.checked : evt.target.value;
        handleChange(resolvedValue);
      }
    };
  }
};

export const useContext = () => {
  return React.useContext(DataContext);
};
