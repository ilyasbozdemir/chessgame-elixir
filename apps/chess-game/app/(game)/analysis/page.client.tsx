"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { ChessBoard } from "@/components/game/chess-board";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Play, Pause, Zap } from "lucide-react";
import { format } from "date-fns";

type Move = {
  number: number;
  white: string;
  black?: string;
};

type EngineLine = {
  pv: string[];
  score: number;
  mate?: number;
};

const INITIAL_MOVES: Move[] = [
  { number: 1, white: "e4", black: "e5" },
  { number: 2, white: "Nf3", black: "Nc6" },
  { number: 3, white: "Bb5", black: "a6" },
];

export default function AnalysisPage() {
  // engine & mock state
  const [engineRunning, setEngineRunning] = useState(false);
  const [depth, setDepth] = useState(18);
  const [multiPV, setMultiPV] = useState(3);
  const [evalHistory, setEvalHistory] = useState<number[]>([
    0, 15, -10, 20, 50, 40,
  ]);
  const [engineLines, setEngineLines] = useState<EngineLine[]>([
    { pv: ["Re1", "cxd4"], score: 120 },
    { pv: ["Nf1", "Nc4"], score: 80 },
    { pv: ["a4", "b4"], score: 40 },
  ]);

  const [moves, setMoves] = useState<Move[]>(INITIAL_MOVES);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(
    moves.length - 1
  );

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!engineRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setEvalHistory((prev) => {
        const last = prev[prev.length - 1] ?? 0;
        const next = Math.round(last + (Math.random() - 0.5) * 40);
        return [...prev, next].slice(-40);
      });

      setEngineLines(() => {
        const base = Math.round(Math.random() * 200 - 50 + depth * 3);
        const lines: EngineLine[] = [];
        for (let i = 0; i < multiPV; i++) {
          lines.push({
            pv: ["mock", "line", "moves", "for", `${i + 1}`],
            score: base - i * 25 + Math.round((Math.random() - 0.5) * 30),
          });
        }
        return lines;
      });
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [engineRunning, depth, multiPV]);

  // summary
  const summary = useMemo(() => {
    const avg = Math.round(
      evalHistory.reduce((a, b) => a + b, 0) / evalHistory.length || 0
    );
    const blunders = Math.max(0, Math.floor(Math.abs(avg) / 200));
    const mistakes = Math.max(0, Math.floor(Math.abs(avg) / 120));
    const brilliants = Math.max(0, Math.floor(Math.abs(avg) / 400));
    const accuracy = Math.max(40, 100 - Math.min(60, Math.abs(avg) / 5));
    return {
      avg,
      blunders,
      mistakes,
      brilliants,
      accuracy: Math.round(accuracy),
    };
  }, [evalHistory]);

  // ChessBoard onMove handler
  const handleMove = (move: Move) => {
    setMoves((prev) => [...prev, move]);
    setCurrentMoveIndex((prev) => prev + 1);
  };

  // PGN download
  const downloadPGN = () => {
    let pgn = "";
    moves.forEach((m) => {
      pgn += `${m.number}. ${m.white}` + (m.black ? ` ${m.black} ` : " ");
    });
    const blob = new Blob([pgn], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analysis-${format(new Date(), "yyyyMMdd-HHmmss")}.pgn`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Chart
  const Chart = ({ data }: { data: number[] }) => {
    const w = 400;
    const h = 120;
    const padding = 10;
    const min = Math.min(...data, -300);
    const max = Math.max(...data, 300);
    const scaleX = (i: number) =>
      (i / Math.max(1, data.length - 1)) * (w - padding * 2) + padding;
    const scaleY = (v: number) =>
      h - ((v - min) / (max - min)) * (h - padding * 2) - padding;
    const points = data.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(" ");
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="rounded">
        <polyline
          fill="none"
          stroke="#06b6d4"
          strokeWidth={2}
          points={points}
        />
      </svg>
    );
  };

  // move controls
  const stepBackward = () => setCurrentMoveIndex((i) => Math.max(0, i - 1));
  const stepForward = () =>
    setCurrentMoveIndex((i) => Math.min(moves.length - 1, i + 1));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analiz Odası</h1>
          <p className="text-sm text-muted-foreground">Mock engine demo</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => setEngineRunning((s) => !s)}>
            {engineRunning ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {engineRunning ? "Durdur" : "Motoru Başlat"}
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: move list + summary */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hamleler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[400px] overflow-auto">
              {moves.map((m, i) => (
                <div
                  key={i}
                  className={`p-1 rounded cursor-pointer ${
                    i === currentMoveIndex
                      ? "bg-muted font-semibold"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setCurrentMoveIndex(i)}
                >
                  {m.number}. {m.white} {m.black ? `| ${m.black}` : ""}
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={stepBackward}>
                  Geri
                </Button>
                <Button size="sm" onClick={stepForward}>
                  İleri
                </Button>
                <Input
                  value={currentMoveIndex + 1}
                  readOnly
                  className="w-20 text-center"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Özet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <h3 className="text-lg font-semibold">{summary.accuracy}%</h3>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Eval</p>
                  <h3 className="text-lg font-semibold">{summary.avg}</h3>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Blunders</p>
                  <h3 className="text-lg font-semibold">{summary.blunders}</h3>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mistakes</p>
                  <h3 className="text-lg font-semibold">{summary.mistakes}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center: board */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Board</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-3">
                <div className="w-full max-w-md">
                  <ChessBoard onMove={handleMove} />
                </div>
                <div className="flex gap-2 mt-2 w-full max-w-md">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setCurrentMoveIndex(0)}
                  >
                    Baş
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setCurrentMoveIndex(moves.length - 1)}
                  >
                    Son
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: engine lines & chart */}
        <div className="lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Değerlendirme Grafiği</CardTitle>
            </CardHeader>
            <CardContent>
              <Chart data={evalHistory} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engine Lines (Top {multiPV})</CardTitle>
            </CardHeader>
            <CardContent>
              {engineLines.map((l, i) => (
                <div key={i} className="p-2 rounded border">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{i + 1}</Badge>
                    <span className="text-sm font-medium">{l.score}</span>
                    <span className="text-xs text-muted-foreground">
                      {l.pv.join(" ")}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
