

import RepoCard from "./RepoCard";
import { useGithubRepos } from "../hooks/useGithubRepos";

export const Hero = () => {
  const { repos, loading, error } = useGithubRepos();

  if (loading) {
    return <h2>Loading repositories...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="hero">

      <div className="relative w-screen h-screen">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>
    </section>
  );
}