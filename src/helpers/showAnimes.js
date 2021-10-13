export const completedAnimes = (animes) =>
  animes.filter((anime) => anime.completed === true);

export const pendingAnimes = (animes) =>
  animes.filter((anime) => anime.completed === false);

export const searchAnimes = (seachTerm, animes) =>
  animes.filter((anime) =>
    anime.title
      .toLocaleLowerCase()
      .includes(seachTerm.toLocaleLowerCase())
  );
