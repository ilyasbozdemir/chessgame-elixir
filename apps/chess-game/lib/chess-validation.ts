import { PieceType, PieceColor } from "@/components/chess/chess-piece";

export interface ChessPosition {
  [square: string]: { type: PieceType; color: PieceColor } | null;
}

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const getSquareCoords = (square: string): [number, number] => {
  const file = square[0];
  const rank = square[1];
  return [files.indexOf(file), ranks.indexOf(rank)];
};

export const isValidSquare = (square: string): boolean => {
  if (square.length !== 2) return false;
  const [file, rank] = square.split('');
  return files.includes(file) && ranks.includes(rank);
};

export const isPathClear = (
  from: string,
  to: string,
  position: ChessPosition
): boolean => {
  const [fromFile, fromRank] = getSquareCoords(from);
  const [toFile, toRank] = getSquareCoords(to);

  const fileStep = Math.sign(toFile - fromFile);
  const rankStep = Math.sign(toRank - fromRank);

  let currentFile = fromFile + fileStep;
  let currentRank = fromRank + rankStep;

  while (currentFile !== toFile || currentRank !== toRank) {
    const square = files[currentFile] + ranks[currentRank];
    if (position[square]) return false;
    currentFile += fileStep;
    currentRank += rankStep;
  }

  return true;
};

export const isValidMove = (
  from: string,
  to: string,
  position: ChessPosition,
  piece: { type: PieceType; color: PieceColor }
): boolean => {
  if (!isValidSquare(from) || !isValidSquare(to)) return false;
  if (from === to) return false;

  const [fromFile, fromRank] = getSquareCoords(from);
  const [toFile, toRank] = getSquareCoords(to);
  const fileDiff = Math.abs(toFile - fromFile);
  const rankDiff = Math.abs(toRank - fromRank);

  const targetPiece = position[to];
  if (targetPiece && targetPiece.color === piece.color) return false;

  switch (piece.type) {
    case 'p': {
      const direction = piece.color === 'w' ? -1 : 1;
      const startRank = piece.color === 'w' ? 6 : 1;
      const actualRankMove = (toRank - fromRank) * direction;

      // Forward move
      if (fromFile === toFile) {
        if (targetPiece) return false;
        if (actualRankMove === 1) return true;
        if (actualRankMove === 2 && fromRank === startRank) {
          const middleSquare = files[fromFile] + ranks[fromRank + direction];
          return !position[middleSquare];
        }
        return false;
      }

      // Capture
      if (fileDiff === 1 && actualRankMove === 1) {
        return !!targetPiece;
      }

      return false;
    }

    case 'n':
      return (fileDiff === 2 && rankDiff === 1) || (fileDiff === 1 && rankDiff === 2);

    case 'b':
      return fileDiff === rankDiff && isPathClear(from, to, position);

    case 'r':
      return (
        (fromFile === toFile || fromRank === toRank) &&
        isPathClear(from, to, position)
      );

    case 'q':
      return (
        (fileDiff === rankDiff || fromFile === toFile || fromRank === toRank) &&
        isPathClear(from, to, position)
      );

    case 'k':
      return fileDiff <= 1 && rankDiff <= 1;

    default:
      return false;
  }
};

export const isPawnPromotion = (
  from: string,
  to: string,
  piece: { type: PieceType; color: PieceColor }
): boolean => {
  if (piece.type !== 'p') return false;
  const toRank = to[1];
  return (piece.color === 'w' && toRank === '8') || (piece.color === 'b' && toRank === '1');
};
