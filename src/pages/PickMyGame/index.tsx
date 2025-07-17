import { PageContainer } from "../../components/PageContainer";
import { t } from "i18next";
import { GameWheel } from "./components/GameWheel";
import { Box, Button } from "@mui/material";
import { usePickMyGame } from "../../hooks/usePickMyGame";
import { useState } from "react";

export const PickMyGame = () => {
  const [steamId, setSteamId] = useState("76561198356693509");

  const {
    angleStep,
    steamGames,
    rotation,
    selectedIndex,
    centerY,
    radius,
    handleSpinClick,
    isSpinning,
    total,
    shuffleGames,
  } = usePickMyGame(steamId);

  if (steamGames?.length === 0) return <p>Carregando jogos...</p>;

  return (
    <>
      <PageContainer title={t("filter_spin_play")}>
        total: {total || "-"}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: centerY + radius + 100,
            userSelect: "none",
            overflow: "hidden",
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

          <GameWheel
            total={total}
            angleStep={angleStep}
            gamesState={steamGames}
            isSpinning={isSpinning}
            rotation={rotation}
            selectedIndex={selectedIndex}
          />
        </Box>
      </PageContainer>
    </>
  );
};
