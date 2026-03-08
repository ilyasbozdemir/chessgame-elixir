export const revalidate = 3600;

export async function GET() {
  const res = await fetch(
    "https://api.github.com/repos/ilyasbozdemir/chessgame-elixir",
    {
      headers: {
        "User-Agent": "chessgame-elixir",
      },
    }
  );

  if (!res.ok) {
    return Response.json({ error: "GitHub API error" }, { status: 500 });
  }

  const data = await res.json();

  return Response.json({
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.subscribers_count,
    issues: data.open_issues_count,
    lastUpdate: data.pushed_at,
    language: data.language,
  });
}
