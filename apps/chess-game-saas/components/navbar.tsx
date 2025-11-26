"use client";

import Link from "next/link";
import { Crown, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from "react";

export function Navbar() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github-stars")
      .then((res) => res.json())
      .then((data) => setStars(data.stars))
      .catch(() => setStars(null));
  }, []);

  const formatStars = (num: number) => {
    if (num > 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold group"
        >
          <div className="p-2 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <span className="tracking-tight">
            <span className="font-bold">Chess</span>
            <span className="text-primary font-bold">Game</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:flex bg-transparent"
          >
            <a
              href="https://github.com/ilyasbozdemir/chessgame-elixir"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="w-4 h-4" />
              <span className="hidden md:inline">Star on GitHub</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs">
                <Star className="w-3 h-3 fill-primary text-primary" />
                <span> {stars !== null ? formatStars(stars) : "..."}</span>
              </div>
            </a>
          </Button>

          <ModeToggle />

          <Button size="sm" asChild>
            <Link href="#signin">Kayıt Ol</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
