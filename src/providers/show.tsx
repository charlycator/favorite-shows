import { ReactNode, useState } from 'react';

import { ShowContext } from './context';
import {
  TSeason,
  TShow,
  TShowsList,
} from '../lib/types.ts';
import {
  searchShow as searchShowAPI,
  querySeasonInfo as querySeasonInfoAPI,
  querySpecificShow as querySpecificShowAPI,
} from '../lib/api.ts';

type Props = {
  children: ReactNode,
}


const ShowProvider = ({ children }: Props ) => {
  const [showsList, setShowsList] =
    useState<TShowsList | undefined>(undefined);
  const [selectedShow, setSelectedShow] =
    useState<TShow| undefined>(undefined);
  const [selectedSeason, setSelectedSeason] =
    useState<TSeason | undefined>(undefined);
  const [error, setError] =
    useState<string | undefined>(undefined);

  /**
   * Used when a user is typing in the input search, so with this function we receive the shows that matches with
   * what they are typing
   */
  const searchShow = async (query: string) => {
    try {
      const response: TShowsList  = await searchShowAPI(query);

      setShowsList(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  const getSeasonDetails = async (showId: string, seasonNumber: number) => {
    try {
      const response: TSeason = await querySeasonInfoAPI(showId, seasonNumber, selectedShow?.title);

      setSelectedSeason(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Unknown error querying the season ${seasonNumber}`);
    }
  }

  /**
   * Triggered when a user selects a show of the search after typing the show that they want in the input search.
   * We get also the first season episodes that we will show them automatically.
   */
  const getShowDetails = async (showId: string) => {
    try {
      const response: TShow = await querySpecificShowAPI(showId);

      // On purpose, no need to await here. Get only the first season episodes
      // since is shown by default when a show is selected
      getSeasonDetails(showId, 1);
      setSelectedShow(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error querying the show');
    }
  }

  const updateSelectedSeason = (showId: string, season: number) => {
    getSeasonDetails(showId, season);
  }

  const updateSelectedShow = (show?: TShow) => {
    show ? getShowDetails(show.id) : setSelectedShow(undefined);
    setShowsList(undefined);
  }

  return (
    <ShowContext.Provider value={{
      searchShow,
      getShowDetails,
      getSeasonDetails,
      updateSelectedSeason,
      updateSelectedShow,
      selectedSeason,
      selectedShow,
      showsList,
      error
    }}>
        {children}
    </ShowContext.Provider>
  );
}

export default ShowProvider;
