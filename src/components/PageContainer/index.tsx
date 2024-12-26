import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { APP_BAR_HEIGHT } from "../HeaderMenu";

type TPageContainer = {
  children: ReactNode;
  title?: string;
};

export const PageContainer = ({ children, title }: TPageContainer) => {
  return (
    <Scrollbars style={{ height: `calc(100% - ${APP_BAR_HEIGHT}px)` }}>
      <Box
        sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {!!title && <Typography variant="h6">{title}</Typography>}

        {children}
      </Box>
    </Scrollbars>
  );
};
