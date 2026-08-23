import { motion } from "motion/react";
import type { Repository } from "../api/axios";

interface Props {
  repo: Repository;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export default function RepoCard({ repo }: Props) {
  const langColor = repo.language
    ? languageColors[repo.language] ?? "#8b949e"
    : "#8b949e";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex h-44 w-full flex-col rounded-xl border border-white/10 bg-zinc-900 p-5 shadow-sm"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="truncate font-mono text-base font-semibold text-zinc-100">
          
          {repo.name}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${
            repo.private
              ? "border-amber-500/30 text-amber-400"
              : "border-emerald-500/30 text-emerald-400"
          }`}
        >
          {repo.private ? "Private" : "Public"}
        </span>
      </div>

      {/* description — this is the ONLY part that scrolls */}
      <div className="mt-3 flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-zinc-400">
        {repo.description || "No description provided."}
      </div>

      {/* footer stats */}
      <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3 text-xs text-zinc-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>
    </motion.a>
  );
}