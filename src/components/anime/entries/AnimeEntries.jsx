import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { searchAnimes } from '../../../helpers/showAnimes';

/* components and lib */
import Alert from '../../utils/Alert';
import AnimeEntry from './AnimeEntry';
import AnimeNewEntryButton from '../ui-actions/AnimeNewEntryButton';
import AnimeViewAnimes from '../ui-actions/AnimeViewAnimes/AnimeViewAnimes';
import EntriesForm from '../forms/EntriesForm';

import LoadingData from '../../utils/Loader-data/LoadingData';

function AnimeEntries() {
  // get data from localstorage
  const getTypeFromLS =
    localStorage.getItem('filter-animes') ||
    JSON.stringify({
      type: null,
      category: 'ALL',
    });

  // get all data from redux
  const { entries, isLoading } = useSelector(
    (state) => state.entries
  );

  // states managed
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');

  const [type, setType] = useState(null);
  const [categoryClass, setCategoryClass] = useState('ALL');

  /* Memorize function for avoid re-rendering  */
  const animesSelected = useCallback(
    (type = null, category = 'ALL') => {
      localStorage.setItem(
        'filter-animes',
        JSON.stringify({ type, category })
      );

      setCategoryClass(category);
      setType(type);
    },
    []
  );

  /* Memorize function for avoid re-rendering  */
  const filterAnimes = useCallback(
    (state = null) => {
      if (state !== null) {
        const newItem = entries.filter(
          (anime) => anime.completed === state
        );

        return setAnimeList(newItem);
      }

      return setAnimeList(entries);
    },
    [entries]
  );

  // get all data for redux store and assign in the state
  useEffect(() => {
    let { type, category } = JSON.parse(getTypeFromLS);

    filterAnimes(type);

    animesSelected(type, category);
  }, [entries, filterAnimes, animesSelected, getTypeFromLS]);

  /* filter animes  */
  const animes = searchAnimes(search.trim(), animeList);

  return (
    <section style={{ height: '100vh' }}>
      <EntriesForm search={search} setSearch={setSearch} />

      {isLoading && <LoadingData />}

      <div className="container-entries ">
        {animes.map((anime) => (
          <AnimeEntry key={anime.id} {...anime} />
        ))}
      </div>

      <div>
        <AnimeNewEntryButton />

        {search && animes.length === 0 && (
          <Alert searchTerm={search} />
        )}

        <AnimeViewAnimes
          filterAnimes={filterAnimes}
          animesSelected={animesSelected}
          type={type}
          category={categoryClass}
        />
      </div>
    </section>
  );
}

export default AnimeEntries;
