import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

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
        gap: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 588,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          sx={{ width: 112, height: 112, border: "2px solid #fff" }}
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
        <Button
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 24px",
            background: "rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
            transition: "background 0.2s",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.2)",
              border: "1.5px solid white",
            },
          }}
        >
          Ver meu portifólio
        </Button>

        <Button
          fullWidth
          startIcon={<GitHubIcon />}
          href="https://github.com/danielmpadua"
          target="_blank"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 24px",
            background: "rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "8px",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
            transition: "background 0.2s",
            "&:hover": {
              background: "rgba(0, 0, 0, 0.2)",
              border: "1.5px solid white",
            },
          }}
        >
          Meu GitHub
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <IconButton
          href="https://www.instagram.com/danielmpadua/"
          target="_blank"
        >
          <InstagramIcon htmlColor="#426274" />
        </IconButton>

        <IconButton
          href="https://www.linkedin.com/in/danielmpadua/"
          target="_blank"
        >
          <LinkedInIcon htmlColor="#426274" />
        </IconButton>
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
