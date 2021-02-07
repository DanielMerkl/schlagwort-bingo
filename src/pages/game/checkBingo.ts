interface Point {
  x: number;
  y: number;
}

export const checkBingo = (
  buzzwords: Array<string> | undefined,
  selectedBuzzwords: Array<string>
): boolean => {
  if (buzzwords === undefined) return false;

  const map: Map<string, Point> = new Map();
  const gameSize = Math.sqrt(buzzwords.length);

  let index = 0;
  for (let y = 0; y < gameSize; y++) {
    for (let x = 0; x < gameSize; x++) {
      map.set(buzzwords[index], { x, y });
      index++;
    }
  }

  // horizontal
  for (let y = 0; y < gameSize; y++) {
    const currentRow: Array<string> = [];
    map.forEach((point, buzzword) => {
      if (point.y === y) {
        currentRow.push(buzzword);
      }
    });
    const fullRowSelected = currentRow.every((buzzword) =>
      selectedBuzzwords.includes(buzzword)
    );
    if (fullRowSelected) {
      return true;
    }
  }

  // vertical
  for (let x = 0; x < gameSize; x++) {
    const currentColumn: Array<string> = [];
    map.forEach((point, buzzword) => {
      if (point.x === x) {
        currentColumn.push(buzzword);
      }
    });
    const fullColumnSelected = currentColumn.every((buzzword) =>
      selectedBuzzwords.includes(buzzword)
    );
    if (fullColumnSelected) {
      return true;
    }
  }

  // diagonal 1
  const diagonal1: Array<string> = [];
  for (let i = 0; i < gameSize; i++) {
    map.forEach((point, buzzword) => {
      if (point.x === i && point.y === i) {
        diagonal1.push(buzzword);
      }
    });
  }
  const fullDiagonal1Selected = diagonal1.every((buzzword) =>
    selectedBuzzwords.includes(buzzword)
  );
  if (fullDiagonal1Selected) {
    return true;
  }

  // diagonal 2
  const diagonal2: Array<string> = [];
  for (let i = 0; i < gameSize; i++) {
    const x = i;
    const y = gameSize - 1 - i;
    map.forEach((point, buzzword) => {
      if (point.x === x && point.y === y) {
        diagonal2.push(buzzword);
      }
    });
  }
  const fullDiagonal2Selected = diagonal2.every((buzzword) =>
    selectedBuzzwords.includes(buzzword)
  );
  if (fullDiagonal2Selected) {
    return true;
  }

  return false;
};
