import { CSSProperties } from "react";
import { Game } from "../../typing/interface/Game";

export const calculateGameStyles = (game: Game | null): CSSProperties => {
  const gameSize = game !== null ? Math.sqrt(game.buzzwords.length) : 0;

  const maxWidth = "500px";
  const gapWidth = `${(gameSize - 1) / 4}rem`;
  const paddingWidth = `2rem`;
  const dynamicHeight = `calc((100vw - ${paddingWidth} - ${gapWidth}) / ${gameSize})`;
  const maxHeight = `calc((${maxWidth} - ${paddingWidth} - ${gapWidth}) / ${gameSize})`;

  return {
    maxWidth: maxWidth,
    display: "grid",
    gap: "0.25rem",
    gridTemplateColumns: `repeat(${gameSize}, 1fr)`,
    gridTemplateRows: `repeat(${gameSize}, min(${dynamicHeight}, ${maxHeight}))`,
  };
};
