// Agrega contribuidores do GitHub: repo do site + repo do marketplace + repos das skills.

export type Contributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
};

const SITE_REPO = "PhAlves23/promptcause";
const MARKET_REPO = "PhAlves23/promptcause-marketplace";
const MARKETPLACE_URL = `https://raw.githubusercontent.com/${MARKET_REPO}/main/.claude-plugin/marketplace.json`;

function githubRepo(url?: string): string {
  const m = url?.match(/github\.com\/([^/]+\/[^/?#.]+)/);
  return m ? m[1].replace(/\.git$/, "") : "";
}

type RawContributor = {
  login: string;
  type?: string;
  avatar_url?: string;
  html_url?: string;
  contributions?: number;
};

async function repoContributors(repo: string): Promise<RawContributor[]> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/contributors?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const arr = await res.json();
    return Array.isArray(arr) ? arr.filter((c: RawContributor) => c.type === "User") : [];
  } catch {
    return [];
  }
}

async function marketplaceRepos(): Promise<string[]> {
  try {
    const res = await fetch(MARKETPLACE_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { plugins?: { source?: { url?: string }; homepage?: string }[] };
    return (data.plugins ?? []).map((p) => githubRepo(p.source?.url || p.homepage)).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getContributors(): Promise<Contributor[]> {
  const repos = [...new Set([SITE_REPO, MARKET_REPO, ...(await marketplaceRepos())])];
  const lists = await Promise.all(repos.map(repoContributors));

  const byLogin = new Map<string, Contributor>();
  for (const list of lists) {
    for (const c of list) {
      if (!c.login) continue;
      const existing = byLogin.get(c.login);
      if (existing) {
        existing.contributions += c.contributions ?? 0;
      } else {
        byLogin.set(c.login, {
          login: c.login,
          avatarUrl: c.avatar_url || `https://github.com/${c.login}.png`,
          profileUrl: c.html_url || `https://github.com/${c.login}`,
          contributions: c.contributions ?? 0,
        });
      }
    }
  }

  return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
}
