import { useEffect, useState } from "preact/hooks";
import { LinesGame } from "./lines-game";
import { LinesGamePlaceholder } from "./lines-game.placeholder";

export const GameLoader = () => {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => setShowGame(true), []);

  return showGame ? <LinesGame /> : <LinesGamePlaceholder />;
};
