export async function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  let data = await fetch(endpoint);
  const repos = await data.json();
  if (!repos.items) {
    throw new Error(data.message);
  }
  return repos.items;
}
