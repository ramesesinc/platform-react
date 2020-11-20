import React from "react";
import ButtonLink from "./ButtonLink";
import PageviewIcon from "@material-ui/icons/Pageview";

const PreviewReport = ({
  caption = "Preview",
  href,
  visibleWhen = true,
  Icon=PageviewIcon
}) => {
  if (!visibleWhen) return null;

  return (
    <ButtonLink
      caption={caption}
      href={href}
      Icon={Icon}
    />
  );
};

export default PreviewReport;
