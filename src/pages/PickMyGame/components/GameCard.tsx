import { Box, Tooltip } from "@mui/material";
import { TSteamGames } from "../../../hooks/usePickMyGame";

type TGameCard = {
  game: TSteamGames;
  index: number;
  isSelected: boolean;
  centerX: number;
  centerY: number;
  angleStep: number;
  radius: number;
  rotation: number;
  isOnTop: boolean;
  isSpinning: boolean;
  total: number;
};

export const GameCard = ({
  game,
  index,
  angleStep,
  centerX,
  centerY,
  isSelected,
  radius,
  rotation,
  isSpinning,
  isOnTop,
  total,
}: TGameCard) => {
  const imageUrl = !!game?.appid
    ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`
    : undefined;

  const width = isSelected ? 220 : 140;
  const height = isSelected ? 83 : 53;

  const boxShadow = isSelected
    ? "0 0 20px 6px #0f0"
    : "0 0 8px rgba(255,255,255,0.2)";

  const getPosition = (indexP: number, rotationDeg: number) => {
    const angleDeg = (indexP * angleStep + rotationDeg) % 360;
    const zangleDeg = ((indexP + 1) * angleStep + rotationDeg) % 360;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = centerX + radius * Math.sin(angleRad);
    const y = centerY - (isSelected ? 0 : radius * Math.cos(angleRad));

    const depthIndex = Math.cos((zangleDeg * Math.PI) / 180); // Destaque no topo

    const zIndex =
      isSelected || isOnTop ? 99999 : Math.round((depthIndex + 1) * 100); // Normaliza para 0–200
    return { x, y, angleDeg, zIndex };
  };

  const rotateDeg =
    getPosition(index, rotation)?.angleDeg - (isSelected ? 0 : 90);

  return (
    <Tooltip
      key={game?.appid ?? index}
      title={game?.name ?? "Desconhecido"}
      arrow
    >
      <Box
        component="img"
        src={imageUrl}
        alt={game?.name ?? "Jogo"}
        sx={{
          position: "absolute",
          top: getPosition(index, rotation)?.y - height / 2,
          left: getPosition(index, rotation)?.x - width / 2,
          width,
          height,
          borderRadius: "8px",
          boxShadow,
          transition: isSelected ? "all 0.3s ease" : undefined,
          cursor: isSelected ? "default" : "pointer",
          userSelect: "none",
          transform: `rotate(${rotateDeg}deg)`,
          willChange: isSpinning ? "transform" : undefined,
          zIndex: getPosition(index, rotation)?.zIndex,
          background: "orange",
        }}
      />
    </Tooltip>
  );
};
