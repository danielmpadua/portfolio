import { useEffect, useRef, useState } from "react";
import { PickMyGameService } from "../services/PickMyGame.service";
import { getRandomInt } from "../utils/pickMyGame";

export type TSteamGames = {
  name: string;
  appid: number;
};

export const usePickMyGame = (steamId: string) => {
  const [steamGames, setSteamGames] = useState<TSteamGames[]>([]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [onTopIndex, setOnTopIndex] = useState<number | null>(null);

  const radius = 260;
  const centerX = window.innerWidth / 2;
  const centerY = 400;
  const total = steamGames?.length;
  const angleStep = 360 / total;

  // Estado da rotação em graus (0 = imagem 0 no topo)
  const rotationRef = useRef(rotation);
  const isSpinningRef = useRef(isSpinning);
  const animationFrameId = useRef<number | null>(null);

  rotationRef.current = rotation;
  isSpinningRef.current = isSpinning;

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
    let frameSkip = 0;

    const frameInterval =
      Math.round(total / 100) >= 1 ? Math.round(total / 100) : 1; // Renderiza a cada 2 frames (~30fps)

    const random = getRandomInt(10, 20);

    let velocity = random * frameInterval;
    const deceleration = (random / 100) * frameInterval * frameInterval;

    const animate = () => {
      if (!isSpinningRef.current) {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        return;
      }

      frameSkip = (frameSkip + 1) % frameInterval;
      if (frameSkip !== 0) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      velocity -= deceleration;
      if (velocity < 0.1) velocity = 0.1;

      let newRotation = (rotationRef.current + velocity) % 360;
      setRotation(newRotation);

      setOnTopIndex((prev) => getClosestToTop(newRotation));

      if (velocity <= 0.1) {
        const closest = getClosestToTop(newRotation);
        const targetRotation = (360 - closest * angleStep) % 360;

        if (Math.abs(newRotation - targetRotation) > 0.5) {
          const diff = (targetRotation - newRotation + 360) % 360;
          newRotation = (newRotation + Math.min(diff, 2)) % 360;
          setRotation(newRotation);
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          const finalRotation = targetRotation;

          setRotation(finalRotation);
          setIsSpinning(false);
          const finalClosest = getClosestToTop(finalRotation); // 🛠 recalcula com base no ângulo corrigido

          setTimeout(() => {
            setSelectedIndex(finalClosest);
          }, 500);
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

    const shuffled = [...steamGames];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSteamGames(shuffled);
    setSelectedIndex(null);
    setRotation(0);
  };

  useEffect(() => {
    PickMyGameService.getSteamGames(steamId)
      .then(({ data }: { data: TSteamGames[] }) => {
        // setSteamGames(data);
        setSteamGames([...data, ...data, ...data, ...data]);
        // setSteamGames(data?.filter((item, index) => index < 2));
      })
      .catch((err) => console.log("error: ", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleSpinClick,
    shuffleGames,
    isSpinning,
    steamGames,
    angleStep,
    selectedIndex,
    rotation,
    radius,
    centerX,
    centerY,
    total,
    onTopIndex,
  };
};
