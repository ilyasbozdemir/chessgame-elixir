// app/api/project-info/route.ts
export const revalidate = 3600; // 1 saat cache

const owner = "ilyasbozdemir";
const repo = "chessgame-elixir";

function summarizeLicense(text?: string | null) {
  if (!text) return "Lisans bilgisi sağlanamadı.";

  const lower = text.toLowerCase();

  if (lower.includes("no commercial") || lower.includes("ticari")) {
    return "Ticari kullanım yasaktır; yalnızca kişisel ve eğitim amaçlı kullanım serbesttir.";
  }
  if (lower.includes("ai") || lower.includes("model")) {
    return "Yapay zeka model eğitimi için kullanılamaz.";
  }
  if (lower.includes("mit")) {
    return "MIT — Ticari kullanım serbesttir; telif ibaresi korunmalıdır.";
  }

  return "Özel lisans — kullanım şartları lisans dosyasında yer almaktadır.";
}

export async function GET() {
  try {
    const repoRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers: { "User-Agent": `${owner}/${repo}` }, cache: "no-store" }
    );

    if (!repoRes.ok) {
      return Response.json({ error: "Repo fetch failed" }, { status: 502 });
    }

    const repoJson = await repoRes.json();

    // Contributors (per_page=1 numaralı sayfadan total page tahmini)
    const contrRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=1`,
      { headers: { "User-Agent": `${owner}/${repo}` }, cache: "no-store" }
    );

    let contributors = null as number | null;
    if (contrRes.ok) {
      const link = contrRes.headers.get("link");
      const match = link?.match(/&page=(\d+)>;\s*rel="last"/i);
      if (match?.[1]) {
        contributors = parseInt(match[1], 10);
      } else {
        const one = await contrRes.json();
        contributors = Array.isArray(one) && one.length > 0 ? 1 : 0;
      }
    }

    // LICENSE fetch
    const licenseRawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/LICENSE`;
    const licRes = await fetch(licenseRawUrl, {
      headers: { "User-Agent": `${owner}/${repo}` },
      cache: "no-store",
    });
    const licenseText = licRes.ok ? await licRes.text() : null;

    const data = {
      name: repoJson?.name,
      description: repoJson?.description,
      stars: repoJson?.stargazers_count,
      forks: repoJson?.forks_count,
      watchers: repoJson?.subscribers_count,
      issues: repoJson?.open_issues_count,
      lastUpdate: repoJson?.pushed_at,
      createdAt: repoJson?.created_at,
      htmlUrl: repoJson?.html_url,
      topics: repoJson?.topics ?? [],
      contributors,
      licenseName:
        repoJson?.license?.name === "Other"
          ? licenseText?.split("\n")[0].trim() || "Özel Lisans"
          : repoJson?.license?.name ?? "Özel Lisans",
      licenseSummary: summarizeLicense(licenseText),
      licenseText,
      licenseRawUrl,
    };

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (e) {
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
