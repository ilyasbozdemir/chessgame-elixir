"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GithubStarsButton() {
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
    <Button
      asChild
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <a
        href="https://github.com/ilyasbozdemir/chessgame-elixir"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-4 h-4" />
        {stars !== null ? formatStars(stars) : "..."}
      </a>
    </Button>
  );
}
