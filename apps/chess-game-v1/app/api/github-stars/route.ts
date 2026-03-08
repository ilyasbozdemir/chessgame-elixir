import { NextResponse } from "next/server";

const GH_API = `https://api.github.com/repos/ilyasbozdemir/chessgame-elixir`;

export const revalidate = 43200;

export async function GET() {
  try {
    const res = await fetch(GH_API, {
      headers: {
        "Accept": "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
      next: { revalidate },
    });

    if (!res.ok) {
      return NextResponse.json({ stars: 0 }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json({ stars: data.stargazers_count });
  } catch (e) {
    return NextResponse.json({ stars: 0 }, { status: 200 });
  }
}
