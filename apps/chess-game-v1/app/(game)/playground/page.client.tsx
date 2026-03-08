"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChessBoard,
  ChessTheme,
  BoardOrientation,
  ChessBoardRef,
  GameMode,
} from "@/components/chess/chess-board";
import { PieceType } from "@/components/chess/chess-piece";
import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Trash2,
  FlipVertical,
  Copy,
  Upload,
  Palette,
  Dice1,
  Activity,
  Puzzle,
  LucideIcon,
  Play,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PageClient = () => {
  const [theme, setTheme] = useState<ChessTheme>("classic");
  const [orientation, setOrientation] = useState<BoardOrientation>("white");
  const [mode, setMode] = useState<GameMode>("random");
  const [currentFEN, setCurrentFEN] = useState<string>("");
  const [customFEN, setCustomFEN] = useState<string>("");
  const [isLoadFENOpen, setIsLoadFENOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const boardRef = useRef<ChessBoardRef>(null);

  const updateFEN = () => {
    if (boardRef.current) {
      setCurrentFEN(boardRef.current.getPosition());
    }
  };

  useEffect(() => {
    updateFEN();
  }, []);

  const handleMove = (
    from: string,
    to: string,
    piece: { type: string; color: string }
  ) => {
    toast(
      `Moved ${
        piece.color === "w" ? "White" : "Black"
      } ${piece.type.toUpperCase()} from ${from} to ${to}`
    );
  };

  const handleClear = () => {
    boardRef.current?.clearBoard();
    toast("Board cleared!");
  };

  const handleReset = () => {
    boardRef.current?.setStartPosition();
    toast("Board reset to starting position");
  };

  const handleLoadFEN = () => {
    if (customFEN.trim()) {
      try {
        boardRef.current?.setPosition(customFEN);
        toast("FEN position loaded successfully!");
        setIsLoadFENOpen(false);
        setCustomFEN("");
      } catch (error) {
        toast("Invalid FEN notation!", {
          description: "Please check the FEN string and try again.",
        });
      }
    }
  };

  const handleCopyFEN = () => {
    navigator.clipboard.writeText(currentFEN);
    toast("FEN notation copied to clipboard!");
  };

  const handleThemeChange = (newTheme: ChessTheme) => {
    setTheme(newTheme);
    toast(`Theme changed to ${newTheme}`);
    setIsThemeOpen(false);
  };

  const handleFlip = () => {
    setOrientation((prev) => (prev === "white" ? "black" : "white"));
    toast(
      `Board flipped to ${
        orientation === "white" ? "black" : "white"
      } perspective`
    );
  };

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    toast(`Mode changed to ${newMode}`);
    setIsModeOpen(false);
  };

  const themes: { value: ChessTheme; label: string }[] = [
    { value: "classic", label: "Classic Wood" },
    { value: "modern", label: "Modern Blue" },
    { value: "emerald", label: "Emerald Green" },
  ];

  type Mode = "random" | "game" | "puzzle";

  const modeData: Record<Mode, { label: string; icon: LucideIcon }> = {
    random: { label: "Random Mode", icon: Dice1 },
    game: { label: "Game Mode", icon: Play },
    puzzle: { label: "Puzzle Mode", icon: Puzzle },
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Interactive Chess Board
          </h1>
          <p className="text-muted-foreground text-lg">
            Drag & drop pieces • Multiple themes • Mobile friendly
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {/* Modal Buttons */}
          <div className="flex gap-3">
            <Dialog open={isLoadFENOpen} onOpenChange={setIsLoadFENOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Upload className="mr-2 h-5 w-5" />
                  Load FEN
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Load FEN Position</DialogTitle>
                  <DialogDescription>
                    Enter a valid FEN notation to load a custom position.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="fen-input">FEN Notation</Label>
                    <Input
                      id="fen-input"
                      placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
                      value={customFEN}
                      onChange={(e) => setCustomFEN(e.target.value)}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsLoadFENOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleLoadFEN}>Load Position</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isThemeOpen} onOpenChange={setIsThemeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Palette className="mr-2 h-5 w-5" />
                  Change Theme
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Board Theme</DialogTitle>
                  <DialogDescription>
                    Choose your preferred chess board theme.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                  <Button
                    variant={theme === "classic" ? "default" : "outline"}
                    onClick={() => handleThemeChange("classic")}
                    className="justify-start"
                  >
                    Classic Theme
                  </Button>
                  <Button
                    variant={theme === "modern" ? "default" : "outline"}
                    onClick={() => handleThemeChange("modern")}
                    className="justify-start"
                  >
                    Modern Theme
                  </Button>
                  <Button
                    variant={theme === "emerald" ? "default" : "outline"}
                    onClick={() => handleThemeChange("emerald")}
                    className="justify-start"
                  >
                    Emerald Theme
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isModeOpen} onOpenChange={setIsModeOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  {React.createElement(modeData[mode].icon, {
                    className: "mr-2 h-5 w-5",
                  })}
                  {modeData[mode].label}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[100vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Select Game Mode</DialogTitle>
                  <DialogDescription>
                    Choose how you want to play chess.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-4">
                  {(Object.keys(modeData) as Mode[]).map((m) => (
                    <Button
                      key={m}
                      variant={mode === m ? "default" : "outline"}
                      onClick={() => handleModeChange(m)}
                      className="justify-start flex-col items-start h-auto p-4 w-full" // <-- w-full ekledik
                    >
                      <span className="font-semibold flex items-center">
                        {React.createElement(modeData[m].icon, {
                          className: "mr-2 h-5 w-5",
                        })}
                        {modeData[m].label}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {m === "random" &&
                          "Move pieces freely without any restrictions"}
                        {m === "game" &&
                          "Valid chess moves only - follows official chess rules"}
                        {m === "puzzle" &&
                          "Only Knights & Bishops can be moved - perfect for learning specific pieces"}
                      </span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Theme Selector */}
          <div className="flex gap-2">
            {themes.map(({ value, label }) => (
              <Button
                key={value}
                variant={theme === value ? "default" : "outline"}
                onClick={() => {
                  setTheme(value);
                  toast(`Theme changed to ${label}`);
                }}
                className="text-sm"
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleFlip}
              title="Flip board"
            >
              <FlipVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              title="Reset to start position"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleClear}
              title="Clear board"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chess Board */}
        <div className="flex justify-center">
          <ChessBoard
            ref={boardRef}
            theme={theme}
            orientation={orientation}
            mode={mode}
            allowedPieces={
              mode === "puzzle" ? (["n", "b"] as PieceType[]) : undefined
            }
            onMove={handleMove}
            onPositionChange={setCurrentFEN}
            onPieceDragStart={(square, piece) => {
              console.log("Drag started:", square, piece);
            }}
            onPieceDragEnd={(from, to) => {
              console.log("Drag ended:", from, "to", to);
            }}
            onSquareClick={(square, piece) => {
              console.log("Square clicked:", square, piece);
            }}
            onInvalidMove={(from, to, reason) => {
              toast(`Invalid move: ${reason}`, {
                description: `Cannot move from ${from} to ${to}`,
              });
            }}
            className="w-full max-w-2xl"
          />
        </div>

        {/* FEN Notation Display */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-card-foreground mb-2">
                FEN Notation
              </h3>
              <code className="block text-sm text-muted-foreground font-mono bg-muted/50 px-3 py-2 rounded break-all">
                {currentFEN || "Empty board"}
              </code>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyFEN}
              title="Copy FEN to clipboard"
              disabled={!currentFEN}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-card-foreground">
            Game Modes
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-card-foreground mb-1">
                Random Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Move pieces freely without any restrictions
              </p>
            </div>
            <div>
              <h3 className="font-medium text-card-foreground mb-1">
                Game Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Valid chess moves only - follows official chess rules
              </p>
            </div>
            <div>
              <h3 className="font-medium text-card-foreground mb-1">
                Puzzle Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Only specific pieces can be moved (currently: Knights & Bishops)
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold text-card-foreground">
            Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Pawn promotion (Queen, Rook, Bishop, Knight)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              FEN notation support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Drag & drop pieces
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Multiple color themes
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Board orientation flip
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Touch-friendly for mobile
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Responsive design
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default PageClient;
