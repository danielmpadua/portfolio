import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { PageContainer } from "../../components/PageContainer";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { PickMyGameService } from "../../services/PickMyGame.service";
import { GameWheel } from "./components/GameWheel";

export type TSteamGames = {
  name: string;
  appid: number;
};

export const PickMyGame = () => {
  const steamId = "76561198356693509";
  const [steamGames, setSteamGames] = useState<TSteamGames[]>([]);

  useEffect(() => {
    PickMyGameService.getSteamGames(steamId)
      .then((res) => {
        console.log("res: ", res);
        setSteamGames(res?.data);
      })
      .catch((err) => console.log("error: ", err));
  }, []);

  if (steamGames?.length === 0) return <p>Carregando jogos...</p>;

  return (
    <PageContainer title={t("filter_spin_play")}>
      <GameWheel games={steamGames} />
    </PageContainer>
  );
};
