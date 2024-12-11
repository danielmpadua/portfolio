import { Button } from "@mui/material";

export const CustomLinkButton = ({
  text,
  icon,
  link,
  onClick,
}: {
  text: string;
  icon?: JSX.Element;
  link?: string;
  onClick?: () => void;
}) => (
  <Button
    fullWidth
    onClick={!!onClick ? onClick : () => {}}
    startIcon={icon}
    href={link || ""}
    target={link ? "_blank" : "_self"}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 24px",
      background: "rgba(0, 0, 0, 0.2)",
      border: "2px solid rgba(255, 255, 255, 0.7)",
      borderRadius: "8px",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      color: "whitesmoke",
      textDecoration: "none",
      fontWeight: 500,
      transition: "background 0.2s",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.4)",
        border: "3px solid white",
        color: "white",
      },
    }}
  >
    {text}
  </Button>
);
