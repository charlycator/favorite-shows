import { ReactNode, useEffect, useState } from 'react';

import { BookmarksContext } from './context';
import {
  TBookmarkedEpisodes,
  TEpisode,
} from '../lib/types.ts';
import {
  bookmarkEpisode as bookmarkEpisodeAPI,
  getBoomarkedEpisodes as getBoomarkedEpisodesAPI,
  isEpisodeBookmarked as isEpisodeBookmarkedAPI,
  removeEpisode as removeEpisodeAPI,
  removeStorage as removeStorageAPI,
} from '../lib/api.ts';

type Props = {
  children: ReactNode,
}


const ShowProvider = ({ children }: Props ) => {
  const [bookmarkedEpisodes, setSavedEpisodes] =
    useState<TBookmarkedEpisodes | undefined>(undefined);

  useEffect(() => {
    setSavedEpisodes(getBoomarkedEpisodesAPI());
  }, []);

  const bookmarkEpisode = (episode: TEpisode, showName: string) => {
    const newList = bookmarkEpisodeAPI(episode, showName);

    setSavedEpisodes(newList);
  }

  const isEpisodeBookmarked = (episode: TEpisode) => {
    return isEpisodeBookmarkedAPI(episode);
  }

  const removeBookmarkedEpisode = (episode: TEpisode) => {
    const newList = removeEpisodeAPI(episode);

    setSavedEpisodes(newList);
  }

  const clearBookmarks = () => {
    removeStorageAPI();
    setSavedEpisodes(undefined);
  }

  return (
    <BookmarksContext.Provider value={{
      bookmarkedEpisodes,
      bookmarkEpisode,
      isEpisodeBookmarked,
      removeBookmarkedEpisode,
      clearBookmarks,
    }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export default ShowProvider;
