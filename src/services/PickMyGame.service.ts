import axios from "axios";

const getSteamGames = (steamId: string): Promise<any> => {
  return axios.get(`http://localhost:3001/api/steam-games/${steamId}`);
};

export const PickMyGameService = {
  getSteamGames,
};
