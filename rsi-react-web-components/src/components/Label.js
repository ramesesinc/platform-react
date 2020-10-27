import React from "react";
import { useContext, getFieldProps } from "./DataContext";
import _ from "lodash/object";


const Label = ({ caption, context, expr, exprValue, children, blur=false, ...rest }) => {
  let value = exprValue || children;
  const ctx = useContext();
  if (context && expr) {
    value = typeof expr === "function" ? expr(context) : _.get(context, expr);
  } else if (ctx) {
    const fieldProps = getFieldProps(ctx, {...rest, name: expr});
    value = fieldProps.value;
  }

  const blurStyle = blur ? styles.blur : {}

  return (
    <div style={{ ...styles.wrapper, ...rest.style, ...blurStyle }}>
      {caption && (
        <label style={{ ...styles.caption, ...rest.captionStyle }}>
          {caption}
        </label>
      )}
      <label style={{ ...styles.label, ...rest.labelStyle }}>
        {value ? value.toString() : children}
      </label>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 5
  },
  caption: {
    fontWeight: "800",
    fontSize: 14,
    width: 200
  },
  label: {
    fontSize: "14px"
  },
  blur: {
    filter: "blur(3px)",
    "-webkit": "blur(3px)",
  }
};

export default Label;
