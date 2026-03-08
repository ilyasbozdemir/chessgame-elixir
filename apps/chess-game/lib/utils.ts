import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date: Date | string) => {
  const d = new Date(date);
  const minutes = Math.floor((Date.now() - d.getTime()) / 60000);
  if (minutes < 1) return "Az önce";
  if (minutes < 60) return `${minutes} dakika önce`;
  return `${Math.floor(minutes / 60)} saat önce`;
};

//--

const isDev = process.env.NODE_ENV !== "production";

//bunlar ilerde tamamne eklenicek app için
export class Logger {
  private prefix: string;

  constructor(prefix = "App") {
    this.prefix = prefix;
  }

  private format(level: string, color: string, ...args: any[]) {
    if (!isDev) return;
    const time = new Date().toLocaleTimeString();
    console.log(
      `%c[${time}] [${this.prefix}] [${level}]`,
      `color:${color}`,
      ...args
    );
  }

  log(...args: any[]) {
    if (!isDev) return;

    console.log(...args);
  }

  info(...args: any[]) {
    this.format("INFO", "#00bcd4", ...args);
  }

  success(...args: any[]) {
    this.format("SUCCESS", "#4caf50", ...args);
  }

  warn(...args: any[]) {
    this.format("WARN", "#ff9800", ...args);
  }

  error(...args: any[]) {
    this.format("ERROR", "#f44336", ...args);
  }

  debug(...args: any[]) {
    this.format("DEBUG", "#9e9e9e", ...args);
  }

  group(title: string) {
    if (!isDev) return;
    console.groupCollapsed(`🧩 [${this.prefix}] ${title}`);
  }

  groupEnd() {
    if (!isDev) return;
    console.groupEnd();
  }
}

export function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}


export function getDisplayInitials(displayName?: string) {
  if (!displayName?.trim()) return "N/A";

  return displayName
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}
