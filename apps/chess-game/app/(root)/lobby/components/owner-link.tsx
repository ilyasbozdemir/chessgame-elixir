"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { UserService } from "@/services/user.service";

interface OwnerLinkProps {
  ownerId?: string;
}

export function OwnerLink({ ownerId }: OwnerLinkProps) {
  const [owner, setOwner] = useState<{
    username: string;
    displayName: string;
  } | null>(null);

  const userService = new UserService();

  useEffect(() => {
    if (!ownerId) return;

    userService.getById(ownerId).then((u) => {
      if (u) setOwner(u);
    });
  }, [ownerId]);

  if (!ownerId) return <span>—</span>;
  if (!owner) return <span>Loading...</span>;

  return (
    <Link
      href={`/profile/${owner.username}`}
      className="hover:underline"
      target="_blank"
    >
      {owner.displayName}
    </Link>
  );
}
