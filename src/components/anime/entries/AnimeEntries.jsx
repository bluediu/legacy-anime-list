import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  completedAnimes,
  pendingAnimes,
  searchAnimes,
} from '../../../helpers/showAnimes';

import { FILTER_ANIMES } from '../../../constants/filter-animes';

/* components and lib */
import Alert from '../../utils/Alert';
import AnimeEntry from './AnimeEntry';
import AnimeNewEntryButton from '../ui-actions/AnimeNewEntryButton';
import AnimeViewAnimes from '../ui-actions/AnimeViewAnimes';
import EntriesForm from '../forms/EntriesForm';

import LoadingData from '../../utils/Loader-data/LoadingData';

function AnimeEntries() {
  // get all data
  const { entries, isLoading } = useSelector(
    (state) => state.entries
  );

  // states managed
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState('');

  const [isSelectAll, setIsSelectAll] = useState(true);
  const [isSelectCompleted, setIsSelectCompleted] =
    useState(false);
  const [isSelectPending, setIsSelectPending] = useState(false);

  /* function that get what is the value save in LocalStorage */
  const getSelectedViewLS = () => {
    let filterAnimesSelection =
      localStorage.getItem('filter-animes') || FILTER_ANIMES.all;

    if (filterAnimesSelection === FILTER_ANIMES.all)
      return showAllAnime();

    if (filterAnimesSelection === FILTER_ANIMES.completed)
      return showCompletedAnime(entries);

    if (filterAnimesSelection === FILTER_ANIMES.pending)
      return showPendingAnime(entries);
  };

  // get all data for redux store and assign in the state
  useEffect(() => {
    (async () => {
      try {
        const animes = await entries;

        setAnimeList(animes);

        getSelectedViewLS();
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  // TODO: REFACTORIZAR FUNCIONALIDAD PARA EL FILTRADO DE ANIMES

  // get all animes when the form search not find result for
  // the search value
  const showAllAnime = () => {
    setAnimeList(entries);

    localStorage.setItem('filter-animes', FILTER_ANIMES.all);

    setIsSelectAll(true);
    setIsSelectCompleted(false);
    setIsSelectPending(false);
  };

  // method that filter anime if completed using (helper)
  const showCompletedAnime = () => {
    const filterCompletedAnimes = completedAnimes(entries);
    setAnimeList(filterCompletedAnimes);

    localStorage.setItem(
      'filter-animes',
      FILTER_ANIMES.completed
    );

    setIsSelectCompleted(true);
    setIsSelectAll(false);
    setIsSelectPending(false);
  };

  // method that filter anime if is pending using (helper)
  const showPendingAnime = () => {
    const filterPendingAnimes = pendingAnimes(entries);
    setAnimeList(filterPendingAnimes);

    localStorage.setItem('filter-animes', FILTER_ANIMES.pending);

    setIsSelectPending(true);
    setIsSelectAll(false);
    setIsSelectCompleted(false);
  };

  const filteredAnimes = searchAnimes(search.trim(), animeList);

  return (
    <section style={{ height: '100vh' }}>
      <EntriesForm search={search} setSearch={setSearch} />

      {isLoading && <LoadingData />}

      <div className="container-entries ">
        {filteredAnimes.map((anime) => (
          <AnimeEntry key={anime.id} {...anime} />
        ))}
      </div>

      <div>
        <AnimeNewEntryButton />

        {search && filteredAnimes.length === 0 && (
          <Alert searchTerm={search} />
        )}

        <AnimeViewAnimes
          allAnime={showAllAnime}
          completedAnimes={showCompletedAnime}
          pendingAnimes={showPendingAnime}
          selectAll={isSelectAll}
          selectCompleted={isSelectCompleted}
          selectPending={isSelectPending}
        />
      </div>
    </section>
  );
}

export default AnimeEntries;
