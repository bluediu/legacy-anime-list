export const searchAnimes = (seachTerm, animes) =>
  animes.filter((anime) =>
    anime.title
      .toLocaleLowerCase()
      .includes(seachTerm.toLocaleLowerCase())
  );
