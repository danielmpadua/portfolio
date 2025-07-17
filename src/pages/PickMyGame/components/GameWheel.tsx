import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { TSteamGames } from "..";

interface GameWheelProps {
  games: TSteamGames[];
}

export const GameWheel: React.FC<GameWheelProps> = ({ games }) => {
  const radius = 300;
  const centerX = window.innerWidth / 2;
  const centerY = 400;

  // Estado local dos jogos, para poder embaralhar
  const [gamesState, setGamesState] = useState<TSteamGames[]>(games);

  const total = gamesState.length;
  const angleStep = 360 / total;

  // Estado da rotação em graus (0 = imagem 0 no topo)
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const rotationRef = useRef(rotation);
  const isSpinningRef = useRef(isSpinning);
  const animationFrameId = useRef<number | null>(null);

  rotationRef.current = rotation;
  isSpinningRef.current = isSpinning;

  // Função que calcula a posição da imagem no círculo baseado no índice e rotação atual
  const getPosition = (index: number, rotationDeg: number) => {
    const angleDeg = (index * angleStep + rotationDeg) % 360;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = centerX + radius * Math.sin(angleRad);
    const y = centerY - radius * Math.cos(angleRad);

    return { x, y, angleDeg };
  };

  // Detecta qual imagem está mais próxima do topo (angleDeg perto de 0)
  const getClosestToTop = (rotationDeg: number) => {
    let closestIndex = 0;
    let smallestDiff = 360;

    for (let i = 0; i < total; i++) {
      const angle = (i * angleStep + rotationDeg) % 360;
      const diff = Math.min(Math.abs(angle), Math.abs(angle - 360));
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  // Animação do giro com desaceleração e parada
  const spin = () => {
    let velocity = 15;
    let deceleration = 0.15;

    const animate = () => {
      if (!isSpinningRef.current) {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        return;
      }

      velocity -= deceleration;
      if (velocity < 0.1) velocity = 0.1;

      let newRotation = (rotationRef.current + velocity) % 360;
      setRotation(newRotation);

      if (velocity <= 0.1) {
        const closest = getClosestToTop(newRotation);
        const targetRotation = (360 - closest * angleStep) % 360;

        if (Math.abs(newRotation - targetRotation) > 0.5) {
          const diff = (targetRotation - newRotation + 360) % 360;
          newRotation = (newRotation + Math.min(diff, 2)) % 360;
          setRotation(newRotation);
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          setRotation(targetRotation);
          setIsSpinning(false);
          setSelectedIndex(closest);
        }
        return;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  const handleSpinClick = () => {
    if (isSpinning) return;
    setSelectedIndex(null);
    setIsSpinning(true);
    spin();
  };

  // Função para embaralhar o array usando Fisher-Yates
  const shuffleGames = () => {
    if (isSpinning) return; // bloqueia durante giro

    const shuffled = [...gamesState];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setGamesState(shuffled);
    setSelectedIndex(null);
    setRotation(0);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: centerY + radius + 100,
        userSelect: "none",
        overflow: "hidden",
        pt: 2,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSpinClick}
          disabled={isSpinning || total === 0}
          sx={{ minWidth: 150 }}
        >
          Escolher jogo
        </Button>

        <Button
          variant="outlined"
          onClick={shuffleGames}
          disabled={isSpinning || total === 0}
          sx={{ minWidth: 150 }}
        >
          Embaralhar jogos
        </Button>
      </Box>

      {/* Seletor fixo no topo do círculo */}
      <Box
        sx={{
          position: "absolute",
          top: centerY - radius - 30,
          left: "calc(50% - 15px)",
          width: 30,
          height: 30,
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)", // triângulo apontando para baixo
          bgcolor: "primary.main",
          zIndex: 20,
        }}
      />

      {/* Círculo de imagens giratório */}
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: centerY + radius,
        }}
      >
        {gamesState.map((game, index) => {
          const { x, y } = getPosition(index, rotation);

          const imageUrl = game?.appid
            ? `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`
            : "https://via.placeholder.com/184x69?text=No+Image";

          const isSelected = index === selectedIndex;

          const width = isSelected ? 220 : 140;
          const height = isSelected ? 83 : 53;
          const boxShadow = isSelected
            ? "0 0 20px 6px #0f0"
            : "0 0 8px rgba(255,255,255,0.2)";
          const zIndex = isSelected ? 10 : 1;

          const angleDeg = (index * angleStep + rotation) % 360;
          const rotateDeg = angleDeg - 90;

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
                  top: y - height / 2,
                  left: x - width / 2,
                  width,
                  height,
                  borderRadius: "8px",
                  boxShadow,
                  transition: isSelected ? "all 0.3s ease" : undefined,
                  cursor: isSelected ? "default" : "pointer",
                  userSelect: "none",
                  transform: `rotate(${rotateDeg}deg)`,
                  zIndex,
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};
