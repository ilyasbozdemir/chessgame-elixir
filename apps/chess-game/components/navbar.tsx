"use client";

import Link from "next/link";
import { Crown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubStarsButton } from "./github-stars-button";

interface NavbarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Navbar({ isOpen, onClose }: NavbarProps) {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex justify-center">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold group"
              >
                <div className="p-2 rounded-full bg-primary/15 ">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <span className="tracking-tight">
                  <span className="font-bold">Chess</span>
                  <span className="text-primary font-bold">Game</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GithubStarsButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
