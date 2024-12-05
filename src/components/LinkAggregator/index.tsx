import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const CustomButton = ({
  text,
  icon,
  link,
  onClick,
}: {
  text: string;
  icon?: JSX.Element;
  link?: string;
  onClick?: () => {};
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
      background: "rgba(0, 0, 0, 0.1)",
      border: "2px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "8px",
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
      color: "whitesmoke",
      textDecoration: "none",
      fontWeight: 500,
      transition: "background 0.2s",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.2)",
        border: "3px solid white",
        color: "white",
      },
    }}
  >
    {text}
  </Button>
);

const CustomIconButton = ({
  icon,
  link,
}: {
  icon?: JSX.Element;
  link?: string;
}) => (
  <IconButton
    sx={{
      border: "2px solid rgba(255, 255, 255, 0.5)",
      color: "whitesmoke",
      background: "rgba(0, 0, 0, 0.1)",
      "&:hover": {
        background: "rgba(0, 0, 0, 0.2)",
        border: "3px solid white",
        color: "white",
      },
    }}
    href={link || ""}
    target={link ? "_blank" : "_self"}
  >
    {icon}
  </IconButton>
);

export const LinkAggregator = () => {
  return (
    <Box
      sx={{
        maxWidth: 360,
        width: "100%",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 588,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{ width: 112, height: 112, border: "3px solid #fff" }}
          src="https://avatars.githubusercontent.com/u/43578469?v=4"
          alt="Daniel Padua"
        />

        <Typography
          fontFamily="Inter"
          fontWeight={500}
          lineHeight="24px"
          color="white"
        >
          @danielmpadua
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <CustomButton text="Ver meu portifólio" />
        <CustomButton
          text="Meu GitHub"
          icon={<GitHubIcon />}
          link="https://github.com/danielmpadua"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CustomIconButton
          icon={<LinkedInIcon />}
          link="https://www.linkedin.com/in/danielmpadua/"
        />

        <CustomIconButton
          icon={<InstagramIcon />}
          link="https://www.instagram.com/danielmpadua/"
        />

        <CustomIconButton
          icon={<FacebookIcon />}
          link="https://www.facebook.com/daniel.marianopadua"
        />
      </Box>

      <Typography
        fontFamily="Inter"
        fontWeight={400}
        fontSize={14}
        lineHeight="12px"
        color="#426274"
      >
        Feito com ♥ por Daniel Pádua :)
      </Typography>
    </Box>
  );
};
