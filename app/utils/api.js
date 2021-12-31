const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }
  return message;
}

export async function getProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}${params}`);
  const profile = res.json();
  if (profile.message) {
    throw new Error(getErrorMsg(profile.message, username));
  }
  return profile;
}
export async function getRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  );
  const repos = res.json();
  if (repos.message) {
    throw new Error(getErrorMsg(repos.message, username));
  }
  return repos;
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

async function getUserData(player) {
  const [profile, repos] = await Promise.all([
    getProfile(player),
    getRepos(player),
  ]);
  return { profile, score: calculateScore(profile.followers, repos) };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}
export async function battle(players) {
  const resArray = await Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]);
  return sortPlayers(resArray);
}

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
