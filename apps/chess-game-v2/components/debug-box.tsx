// components/debug-box.tsx

"use client";

interface DebugBoxProps {
  label?: string;
  data: any;
  collapsed?: boolean;
}

export function DebugBox({ label, data, collapsed = false }: DebugBoxProps) {
  // Sadece development ortamında göster
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <details
      className="border rounded p-2 bg-muted/40 text-xs font-mono whitespace-pre-wrap"
      open={!collapsed}
    >
      {label && <summary className="cursor-pointer mb-2">{label}</summary>}

      <pre className="text-[11px] leading-tight">
        {JSON.stringify(data, null, 2)}
      </pre>
    </details>
  );
}
