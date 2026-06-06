// Lê o catálogo de skills do marketplace público (PromptCause) no GitHub
// e enriquece cada skill com o autor (perfil/avatar do GitHub).

export type Skill = {
  name: string;
  description: string;
  category?: string;
  homepage: string;
  author: { login: string; name: string; profileUrl: string; avatarUrl: string };
  stars: number;
  forks: number;
};

function githubRepo(url?: string): string {
  const m = url?.match(/github\.com\/([^/]+\/[^/?#.]+)/);
  return m ? m[1].replace(/\.git$/, "") : "";
}

async function fetchRepoStats(repo: string): Promise<{ stars: number; forks: number }> {
  if (!repo) return { stars: 0, forks: 0 };
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { stars: 0, forks: 0 };
    const r = (await res.json()) as { stargazers_count?: number; forks_count?: number };
    return { stars: r.stargazers_count ?? 0, forks: r.forks_count ?? 0 };
  } catch {
    return { stars: 0, forks: 0 };
  }
}

const MARKETPLACE_REPO = "PhAlves23/prompt-cause-marketplace";
const MARKETPLACE_URL = `https://raw.githubusercontent.com/${MARKETPLACE_REPO}/main/.claude-plugin/marketplace.json`;

/** Estrelas e forks do repositório do marketplace (GitHub API). */
export async function getMarketplaceStats(): Promise<{ stars: number; forks: number } | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${MARKETPLACE_REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const r = (await res.json()) as { stargazers_count?: number; forks_count?: number };
    return { stars: r.stargazers_count ?? 0, forks: r.forks_count ?? 0 };
  } catch {
    return null;
  }
}

function githubOwner(url?: string): string {
  const m = url?.match(/github\.com\/([^/]+)/);
  return m ? m[1] : "";
}

type GhUser = { name: string; avatarUrl: string; profileUrl: string };
async function fetchGithubUser(login: string): Promise<GhUser | null> {
  if (!login) return null;
  try {
    const res = await fetch(`https://api.github.com/users/${login}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 21600 }, // 6h
    });
    if (!res.ok) return null;
    const u = (await res.json()) as { name?: string; avatar_url?: string; html_url?: string };
    return {
      name: u.name || login,
      avatarUrl: u.avatar_url || `https://github.com/${login}.png`,
      profileUrl: u.html_url || `https://github.com/${login}`,
    };
  } catch {
    return null;
  }
}

type MarketplacePlugin = {
  name: string;
  description?: string;
  category?: string;
  homepage?: string;
  source?: { url?: string };
};

export async function getSkills(): Promise<Skill[]> {
  let data: { plugins?: MarketplacePlugin[]; owner?: { name?: string } };
  try {
    const res = await fetch(MARKETPLACE_URL, { next: { revalidate: 3600 } }); // 1h
    if (!res.ok) return [];
    data = await res.json();
  } catch {
    return [];
  }

  const plugins = data.plugins ?? [];
  const resolved = await Promise.all(
    plugins.map(async (p): Promise<Skill> => {
      const repoUrl = p.source?.url || p.homepage || "";
      const login = githubOwner(repoUrl) || githubOwner(p.homepage);
      const repo = githubRepo(repoUrl) || githubRepo(p.homepage);
      const [gh, stats] = await Promise.all([fetchGithubUser(login), fetchRepoStats(repo)]);
      return {
        name: p.name,
        description: p.description ?? "",
        category: p.category,
        homepage: p.homepage || repoUrl,
        author: {
          login,
          name: gh?.name || data.owner?.name || login,
          profileUrl: gh?.profileUrl || `https://github.com/${login}`,
          avatarUrl: gh?.avatarUrl || `https://github.com/${login}.png`,
        },
        stars: stats.stars,
        forks: stats.forks,
      };
    }),
  );

  // catálogo ordenado pelos mais populares (estrelas, depois forks)
  return resolved.sort((a, b) => b.stars - a.stars || b.forks - a.forks);
}
