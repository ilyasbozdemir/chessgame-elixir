"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const students = ["İlyas B.", "Ahmet K.", "Ceren D.", "Selin G."];
  const [active, setActive] = useState("İlyas B.");

  const messages = [
    { from: "İlyas B.", text: "Hocam yarın gambit çalışalım mı?" },
    { from: "Coach", text: "Tabii ki, hazırlık yaparım 👍" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 h-[600px]">
      {/* Sidebar */}
      <div className="border-r p-4 space-y-3">
        {students.map((s) => (
          <div
            key={s}
            className={`p-2 rounded cursor-pointer ${
              active === s ? "bg-muted font-semibold" : "hover:bg-muted/50"
            }`}
            onClick={() => setActive(s)}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="md:col-span-3 p-4 flex flex-col justify-between">
        <Card className="flex-1 mb-4">
          <CardContent className="p-4 space-y-2">
            {messages.map((m, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground">{m.from}</p>
                <div className="p-2 border rounded-lg inline-block">{m.text}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Input placeholder="Mesaj yaz..." />
          <Button>Gönder</Button>
        </div>
      </div>
    </div>
  );
}
