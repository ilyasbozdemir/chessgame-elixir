import type { Board, ChessPiece, Position } from "./chess-types"

export function initializeBoard(): Board {
  const board: Board = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null))

  // Siyah taşlar
  board[0] = [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" },
  ]

  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: "pawn", color: "black" }
  }

  // Beyaz taşlar
  for (let i = 0; i < 8; i++) {
    board[6][i] = { type: "pawn", color: "white" }
  }

  board[7] = [
    { type: "rook", color: "white" },
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" },
  ]

  return board
}

export function isValidMove(board: Board, from: Position): Position[] {
  const piece = board[from.row][from.col]
  if (!piece) return []

  const validMoves: Position[] = []

  switch (piece.type) {
    case "pawn":
      validMoves.push(...getPawnMoves(board, from, piece))
      break
    case "knight":
      validMoves.push(...getKnightMoves(board, from, piece))
      break
    case "bishop":
      validMoves.push(...getBishopMoves(board, from, piece))
      break
    case "rook":
      validMoves.push(...getRookMoves(board, from, piece))
      break
    case "queen":
      validMoves.push(...getQueenMoves(board, from, piece))
      break
    case "king":
      validMoves.push(...getKingMoves(board, from, piece))
      break
  }

  return validMoves
}

function isOnBoard(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8
}

function canMoveTo(board: Board, row: number, col: number, pieceColor: "white" | "black"): boolean {
  if (!isOnBoard(row, col)) return false
  const targetPiece = board[row][col]
  return !targetPiece || targetPiece.color !== pieceColor
}

function getPawnMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const direction = piece.color === "white" ? -1 : 1
  const startRow = piece.color === "white" ? 6 : 1

  // İleri hareket
  const oneStep = from.row + direction
  if (isOnBoard(oneStep, from.col) && !board[oneStep][from.col]) {
    moves.push({ row: oneStep, col: from.col })

    // İlk hamlede 2 kare
    if (from.row === startRow) {
      const twoSteps = from.row + direction * 2
      if (isOnBoard(twoSteps, from.col) && !board[twoSteps][from.col]) {
        moves.push({ row: twoSteps, col: from.col })
      }
    }
  }

  // Çapraz yeme
  const capturePositions = [
    { row: from.row + direction, col: from.col - 1 },
    { row: from.row + direction, col: from.col + 1 },
  ]

  for (const pos of capturePositions) {
    if (isOnBoard(pos.row, pos.col)) {
      const targetPiece = board[pos.row][pos.col]
      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push(pos)
      }
    }
  }

  return moves
}

function getKnightMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const knightMoves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ]

  for (const [dRow, dCol] of knightMoves) {
    const newRow = from.row + dRow
    const newCol = from.col + dCol
    if (canMoveTo(board, newRow, newCol, piece.color)) {
      moves.push({ row: newRow, col: newCol })
    }
  }

  return moves
}

function getBishopMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  for (const [dRow, dCol] of directions) {
    let row = from.row + dRow
    let col = from.col + dCol

    while (isOnBoard(row, col)) {
      const targetPiece = board[row][col]

      if (!targetPiece) {
        moves.push({ row, col })
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ row, col })
        }
        break
      }

      row += dRow
      col += dCol
    }
  }

  return moves
}

function getRookMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]

  for (const [dRow, dCol] of directions) {
    let row = from.row + dRow
    let col = from.col + dCol

    while (isOnBoard(row, col)) {
      const targetPiece = board[row][col]

      if (!targetPiece) {
        moves.push({ row, col })
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ row, col })
        }
        break
      }

      row += dRow
      col += dCol
    }
  }

  return moves
}

function getQueenMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  return [...getRookMoves(board, from, piece), ...getBishopMoves(board, from, piece)]
}

function getKingMoves(board: Board, from: Position, piece: ChessPiece): Position[] {
  const moves: Position[] = []
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  for (const [dRow, dCol] of directions) {
    const newRow = from.row + dRow
    const newCol = from.col + dCol
    if (canMoveTo(board, newRow, newCol, piece.color)) {
      moves.push({ row: newRow, col: newCol })
    }
  }

  return moves
}

export function movePiece(board: Board, from: Position, to: Position): Board {
  const newBoard = board.map((row) => [...row])
  const piece = newBoard[from.row][from.col]

  newBoard[to.row][to.col] = piece
  newBoard[from.row][from.col] = null

  return newBoard
}

export function getPieceSymbol(piece: ChessPiece): string {
  const symbols = {
    white: {
      king: "♔",
      queen: "♕",
      rook: "♖",
      bishop: "♗",
      knight: "♘",
      pawn: "♙",
    },
    black: {
      king: "♚",
      queen: "♛",
      rook: "♜",
      bishop: "♝",
      knight: "♞",
      pawn: "♟",
    },
  }

  return symbols[piece.color][piece.type]
}
