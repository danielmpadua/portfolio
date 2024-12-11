import { Box, keyframes } from "@mui/material";

const infinityScroll = keyframes`
from {
  translate: -50%;
}  
to {
    translate: 0;
  }
`;

type TBackgroundScroll = {
  elements: number[];
  image: string;
  width: number;
  speed?: number;
  zIndex?: number;
  paused?: boolean;
};

export const BackgroundScroll = ({
  elements,
  image,
  width,
  speed = 15,
  zIndex = 1,
  paused,
}: TBackgroundScroll) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: -10,
        zIndex,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          animation: `${infinityScroll} ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "inherit",
        }}
      >
        {elements.map((_, index) => (
          <img key={index} src={image} alt="ground" style={{ width }} />
        ))}
      </Box>
    </Box>
  );
};
