import { IconButton } from "@mui/material";

export const CustomLinkIconButton = ({
  icon,
  link,
  smoothHover,
}: {
  icon?: JSX.Element;
  link?: string;
  smoothHover?: boolean;
}) => (
  <IconButton
    sx={{
      border: "2px solid rgba(255, 255, 255, 0.7)",
      color: "whitesmoke",
      background: "rgba(0, 0, 0, 0.2)",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.4)",
        border: `${smoothHover ? 2 : 3}px solid white`,
        color: "white",
      },
    }}
    href={link || ""}
    target={link ? "_blank" : "_self"}
  >
    {icon}
  </IconButton>
);
